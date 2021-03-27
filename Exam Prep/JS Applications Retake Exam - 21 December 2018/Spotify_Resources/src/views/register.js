import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/data.js'
import { loading, notify } from '../notification.js';

let registerTemplate = (submit) => html`
<section id="registerView">
    <div class="background-spotify">
        <div class="song-container">
            <h1>Register</h1>
            <form @submit=${submit}>
                <div class="form-group">
                    <label for="username" class="white-labels">Username</label>
                    <input type="text" name="username" class="form-control" placeholder="Enter username">
                </div>
                <div class="form-group">
                    <label for="password" class="white-labels">Password</label>
                    <input type="password" name="password" class="form-control" placeholder="Password">
                </div>
                <button type="submit" class="btn btn-primary">Register</button>
            </form>
            <h4 class="mt-3 text-white">Already have an account? <a href="/login" class="add-link">Login</a></h4>
        </div>
    </div>
</section>`;

export async function registerPage(ctx) {
    console.log('register');
    ctx.render(registerTemplate(submit));

    async function submit(ev) {
        ev.preventDefault();
        let form = new FormData(ev.target);

        let email = form.get('username');
        let password = form.get('password');

        try {
            if (!email || !password) {
                throw new Error('All fields are required!');
            } else if (email.length < 3) {
                throw new Error('The username should be at least 3 characters long');
            } else if (password.length < 6) {
                throw new Error('The password should be at least 6 characters long');
            }

            await register(email, password);
            loading();
            setTimeout(() => {
                success('User registration successful.');
                ctx.page.redirect('/');
                ctx.setUserNav();
            }, 1000);
        } catch(err) {
            notify(err.message);
        }
    }
}