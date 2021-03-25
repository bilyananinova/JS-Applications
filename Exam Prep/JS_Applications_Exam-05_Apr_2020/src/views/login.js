import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../api/data.js';


let loginTemplate = (submit) => html`
<div class="container auth">
    <form @submit=${submit}>
        <fieldset>
            <legend>Login</legend>
            <blockquote>Knowledge is like money: to be of value it must circulate, and in circulating it can
                increase in quantity and, hopefully, in value</blockquote>
            <p class="field email">
                <input type="email" id="email" name="email" placeholder="maria@email.com">
                <label for="email">Email:</label>
            </p>
            <p class="field password">
                <input type="password" id="login-pass" name="password">
                <label for="login-pass">Password:</label>
            </p>
            <p class="field submit">
                <button class="btn submit" type="submit">Log In</button>
            </p>
            <p class="field">
                <span>If you don't have profile click <a href="/register">here</a></span>
            </p>
        </fieldset>
    </form>
</div>`;


export async function loginPage(ctx) {
    console.log('login');
    ctx.render(loginTemplate(submit));

    async function submit(ev) {
        ev.preventDefault();

        let formData = new FormData(ev.target);
        let email = formData.get('email').trim();
        let password = formData.get('password').trim();

        await login(email, password);
        ctx.setUserNav();
        ctx.page.redirect('/');
    }

}