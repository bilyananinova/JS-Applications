import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/data.js';

let registerTemplate = (submit) => html`
<section class="register">
    <form @submit=${submit} action="#" method="post">
        <fieldset>
            <legend>Register</legend>
            <p class="field">
                <label for="username">Username</label>
                <span class="input">
                    <input type="text" name="username" id="username" placeholder="Username" />
                    <span class="actions"></span>
                    <i class="fas fa-user"></i>
                </span>
            </p>
            <p class="field">
                <label for="password">Password</label>
                <span class="input">
                    <input type="password" name="password" id="password" placeholder="Password" />
                    <span class="actions"></span>
                    <i class="fas fa-key"></i>
                </span>
            </p>
            <input class="button" type="submit" class="submit" value="Register" />
        </fieldset>
    </form>
</section>`;

export async function registerPage(ctx) {
    // console.log('registerPage');
    ctx.render(registerTemplate(submit));

    async function submit(ev) {
        ev.preventDefault();
        
        let formData = new FormData(ev.target);
        let email = formData.get('username').trim();
        let password = formData.get('password').trim();

        if (email == '' || password == '') {
            return alert('All field are required!');
        }

        await register(email, password);
        ctx.setUserNav();
        ctx.page.redirect('/');

    }

}