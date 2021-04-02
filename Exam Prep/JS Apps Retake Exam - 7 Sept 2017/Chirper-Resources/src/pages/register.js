import { html } from '../../node_modules/lit-html/lit-html.js';
import { register, createUser } from '../api/data.js';

let registerTemplate = (submit) => html`
<section id="viewRegister">
    <div class="content">
        <form @submit=${submit} class="form" id="formRegister">
            <label>Username</label>
            <input name="username" type="text">
            <label>Password</label>
            <input name="password" type="password">
            <label>Repeat Password</label>
            <input name="repeatPass" type="password">
            <input id="btnRegister" value="Register" type="submit">
            <a href="/login">Log in</a>
        </form>
    </div>
</section>`;

export async function registerPage(ctx) {
    ctx.render(registerTemplate(submit));

    async function submit(ev) {
        ev.preventDefault();
        let form = new FormData(ev.target);

        let email = form.get('username');
        let password = form.get('password');

        await register(email, password);
        let body = {
            email,
            subscriptions: []
        }
        await createUser(body)
        ctx.setUserNav();
        ctx.page.redirect('/')

    }
}