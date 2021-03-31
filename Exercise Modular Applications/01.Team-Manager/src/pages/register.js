import { html } from '../../node_modules/lit-html/lit-html.js'
import { register } from '../api/data.js';

let registerTemplate = (submit, msg) => html`
<section id="register">
    <article class="narrow">
        <header class="pad-med">
            <h1>Register</h1>
        </header>
        <form @submit=${submit} id="register-form" class="main-form pad-large">
        ${msg 
            ? html `
            <div class="error">${msg}</div>`
            : ''}
            <label>E-mail: <input type="text" name="email"></label>
            <label>Username: <input type="text" name="username"></label>
            <label>Password: <input type="password" name="password"></label>
            <label>Repeat: <input type="password" name="repass"></label>
            <input class="action cta" type="submit" value="Create Account">
        </form>
        <footer class="pad-small">Already have an account? <a href="/login" class="invert">Sign in here</a>
        </footer>
    </article>
</section>`;

export async function registerPage(ctx) {
    ctx.render(registerTemplate(submit));

    async function submit(ev) {
        ev.preventDefault();
        let form = new FormData(ev.target);

        let email = form.get('email');
        let username = form.get('username');
        let password = form.get('password');
        let repass = form.get('repass');
        
        try {

            if (!email || !username || !password || !repass) {
                throw new Error ('All fields are required');
            } else if(password != repass) {
                throw new Error ('Passwords do not match');
            } else if (username.length < 4) {
                throw new Error ('Username must be at least 3 characters');
            } else if (password.length < 10) {
                throw new Error ('Password must be at least 3 characters');
            }
            
            await register(email, password, username);
            ctx.setUserNav();
            ctx.page.redirect('/myTeams');
        } catch (e) {
        ctx.render(registerTemplate(submit, e.message));
        }
    }
}