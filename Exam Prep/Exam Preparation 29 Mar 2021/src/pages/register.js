import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/data.js';

let registerTemplate = (submit) => html`
<section id="register">
    <div class="container">
        <form @submit=${submit} id="register-form">
            <h1>Register</h1>
            <p>Please fill in this form to create an account.</p>
            <hr>

            <p>Username</p>
            <input type="text" placeholder="Enter Username" name="username" required>

            <p>Password</p>
            <input type="password" placeholder="Enter Password" name="password" required>

            <p>Repeat Password</p>
            <input type="password" placeholder="Repeat Password" name="repeatPass" required>
            <hr>

            <input type="submit" class="registerbtn" value="Register">
        </form>
        <div class="signin">
            <p>Already have an account?
                <a href="/login">Sign in</a>.
            </p>
        </div>
    </div>
</section>`;

export async function registerPage(ctx) {
    console.log('registerPage');
    ctx.render(registerTemplate(submit));

    async function submit(ev) {
        ev.preventDefault();

        let form = new FormData(ev.target);

        let username = form.get('username');
        let password = form.get('password');
        let rePass = form.get('repeatPass');

        try {
            if (!username || !password) {
                throw new Error('All fielad are required!');
            } else if(password != rePass) {
                throw new Error('Passwords dont\'t match!');
            }

            await register(username, password);
            ev.target.reset();
            ctx.setUserNav();
            ctx.page.redirect('/catalog');

        } catch (err) {
            alert(err.message);
        }
    }
}