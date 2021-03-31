import { html } from '../../node_modules/lit-html/lit-html.js'
import { login } from '../api/data.js';

let loginTemplate = (submit, msg) => html`
<section id="login">
    <article class="narrow">
        <header class="pad-med">
            <h1>Login</h1>
        </header>
        <form @submit=${submit} id="login-form" class="main-form pad-large">
            ${msg 
            ? html `
            <div class="error">${msg}</div>`
            : ''}
            
            <label>E-mail: <input type="text" name="email"></label>
            <label>Password: <input type="password" name="password"></label>
            <input class="action cta" type="submit" value="Sign In">
        </form>
        <footer class="pad-small">Don't have an account? <a href="/register" class="invert">Sign up here</a>
        </footer>
    </article>
</section>`;

export async function loginPage(ctx) {
    ctx.render(loginTemplate(submit));

    async function submit(ev) {
        ev.preventDefault();
        let form = new FormData(ev.target);

        let email = form.get('email');
        let password = form.get('password');

        try {
            await login(email, password);
            ctx.setUserNav();
            ctx.page.redirect('/myTeams');
        } catch (err) {
            ctx.render(loginTemplate(submit, err.message));
        }
    }
}