import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/data.js';

let registerTemplate = (onSubmit) => html`
<section id="register-page" class="content auth">
    <h1>Register</h1>

    <form @submit=${onSubmit} id="register" action="#" method="">
        <fieldset>
            <blockquote>Knowledge is not simply another commodity. On the contrary. Knowledge is never used up.
                It
                increases by diffusion and grows by dispersion.</blockquote>
            <p class="field email">
                <label for="register-email">Email:</label>
                <input type="email" id="register-email" name="email" placeholder="maria@email.com">
            </p>
            <p class="field password">
                <label for="register-pass">Password:</label>
                <input type="password" name="password" id="register-pass">
            </p>
            <p class="field password">
                <label for="register-rep-pass">Repeat password:</label>
                <input type="password" name="rep-pass" id="register-rep-pass">
            </p>
            <p class="field submit">
                <input class="btn submit" type="submit" value="Register">
            </p>
            <p class="field">
                <span>If you already have profile click <a href="/login">here</a></span>
            </p>
        </fieldset>
    </form>
</section>`;

export async function registerPage(ctx) {
    // console.log('registerPage');
    ctx.render(registerTemplate(onSubmit));

    async function onSubmit(ev) {
        ev.preventDefault();
        let form = new FormData(ev.target);

        let email = form.get('email').trim();
        let password = form.get('password').trim();
        let rePass = form.get('rep-pass').trim();

        try {
            if (!email || !password || !rePass) {
                throw new Error('All fields are require!');
            } else if(password != rePass) {
                throw new Error('Passwords dont\'t match');
            }

            await register(email, password);
            ev.target.reset();
            ctx.setUSerNav();
            ctx.page.redirect('/');

        } catch (err) {
            alert(err.message);
        }
    }

}