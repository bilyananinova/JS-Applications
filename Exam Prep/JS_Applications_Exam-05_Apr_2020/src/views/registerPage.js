import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/data.js';


let registerTamplate = (submit) => html`

<div class="container auth">
    <form @submit=${submit}>
        <fieldset>
            <legend>Register</legend>
            <blockquote>Knowledge is not simply another commodity. On the contrary. Knowledge is never used up. It
                increases by diffusion and grows by dispersion.</blockquote>
            <p class="field email">
                <input type="email" id="email" name="email" placeholder="maria@email.com">
                <label for="email">Email:</label>
            </p>
            <p class="field password">
                <input type="password" name="password" id="register-pass">
                <label for="register-pass">Password:</label>
            </p>
            <p class="field password">
                <input type="password" name="rep-pass" id="rep-pass">
                <label for="rep-pass">Repeat password:</label>
            </p>
            <p class="field submit">
                <button class="btn submit" type="submit">Register</button>
            </p>
            <p class="field">
                <span>If you already have profile click <a href="${'/'}">here</a></span>
            </p>
        </fieldset>
    </form>`;


export async function registerPage(ctx) {
    console.log('register');
    ctx.render(registerTamplate(submit));

    async function submit(ev) {
        ev.preventDefault();

        let formData = new FormData(ev.target);
        let email = formData.get('email').trim();
        let password = formData.get('password').trim();
        let rePass = formData.get('rep-pass').trim();

        if (email == '' || password == '' || rePass == '') {
            ctx.render(registerTamplate(submit, email == '', password == '', rePass == ''));
            return alert('All field are required!');
        } else if (password != rePass) {
            ctx.render(registerTamplate(submit, false, true, true));
            return alert('Password don\'t match!');
        } else {
            await register(email, password);
            ctx.setUserNav();
            ctx.page.redirect('/');
        }
    }
}