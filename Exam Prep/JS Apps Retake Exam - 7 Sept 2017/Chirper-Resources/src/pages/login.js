import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../api/data.js';

let loginTemplate = (submit) => html`
<section id="viewLogin">
    <div class="content">
        <form @submit=${submit} id="formLogin" class="form">
            <label>Username</label>
            <input name="username" type="text">
            <label>Password</label>
            <input name="password" type="password">
            <input id="btnLogin" value="Sign In" type="submit">
            <a href="/register">Register</a>
        </form>
    </div>
</section>`;


export async function loginPage(ctx) {
    // console.log('loginPage');
    ctx.render(loginTemplate(submit));

    async function submit(ev) {
        ev.preventDefault();
        let form = new FormData(ev.target);

        let email = form.get('username');
        let password = form.get('password');

        await login(email, password);
        ctx.page.redirect('/')
    }

}