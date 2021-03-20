import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../api/data.js';

let loginTemplate = (submit) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Login User</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${submit}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="email">Email</label>
                <input class="form-control" id="email" type="text" name="email">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="password">Password</label>
                <input class="form-control" id="password" type="password" name="password">
            </div>
            <input type="submit" class="btn btn-primary" value="Login" />
        </div>
    </div>
</form>`;


export async function loginPage(ctx) {
    // console.log('loginPage');
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