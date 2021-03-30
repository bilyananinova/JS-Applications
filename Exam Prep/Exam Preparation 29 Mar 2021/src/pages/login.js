import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../api/data.js';

let loginTemplate = (submit) => html`
<section id="login">
    <div class="container">
        <form @submit=${submit} id="login-form" action="#" method="post">
            <h1>Login</h1>
            <p>Please enter your credentials.</p>
            <hr>

            <p>Username</p>
            <input placeholder="Enter Username" name="username" type="text">

            <p>Password</p>
            <input type="password" placeholder="Enter Password" name="password">
            <input type="submit" class="registerbtn" value="Login">
        </form>
        <div class="signin">
            <p>Dont have an account?
                <a href="/register">Sign up</a>.
            </p>
        </div>
    </div>
</section>`;


export async function loginPage(ctx) {
    console.log('loginPage');
    ctx.render(loginTemplate(submit));

    async function submit(ev) {
        ev.preventDefault();

        let form = new FormData(ev.target);

        let username = form.get('username');
        let password = form.get('password');

        try {
            if (!username || !password) {
                throw new Error('All fielad are required!');
            }

            await login(username, password);
            ev.target.reset();
            ctx.setUserNav();
            ctx.page.redirect('/catalog');

        } catch (err) {
            alert(err.message);
        }
    }

}