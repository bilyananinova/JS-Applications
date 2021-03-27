import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../api/data.js';
import { loading, notify, success } from '../notification.js';

let loginTemplate = (submit) => html`
<section id="loginView">
    <div class="background-spotify">
        <div class="song-container">
            <h1>Login</h1>
            <form @submit=${submit} action="#" method="POST">
                <div class="form-group">
                    <label for="username" class="white-labels">Username</label>
                    <input id="username" type="text" name="username" class="form-control" placeholder="Enter username">
                </div>
                <div class="form-group">
                    <label for="password" class="white-labels">Password</label>
                    <input id="password" type="password" name="password" class="form-control" placeholder="Password">
                </div>
                <button type="submit" class="btn btn-primary">Login</button>
            </form>

            <h4 class="mt-3 text-white">No account yet? <a href="/register" class="add-link">Register</a></h4>
        </div>
    </div>
</section>`;

export async function loginPage(ctx) {
    console.log('login');
    ctx.render(loginTemplate(submit));

    async function submit(ev) {
        ev.preventDefault();
        let form = new FormData(ev.target);

        let email = form.get('username');
        let password = form.get('password');
        try {
            if (!email || !password) {
                return notify('All fields are required!');
            }

            await login(email, password);
            ev.target.reset();
            loading();
            setTimeout(() => {
                success('Login successful.')
                ctx.page.redirect('/');
                ctx.setUserNav();
            }, 1000);
        } catch (err) {
            notify(err.message);
        }
    }
}