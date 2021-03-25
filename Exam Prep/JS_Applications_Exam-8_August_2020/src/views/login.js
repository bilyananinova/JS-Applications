import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../api/data.js';

let loginTemplate = (submit, msg) => html`

${msg ? notificationError(msg) : ''}

<form @submit=${submit} class="text-center border border-light p-5" action="" method="">
    <div class="form-group">
        <label for="email">Email</label>
        <input type="email" class="form-control" placeholder="Email" name="email" value="">
    </div>
    <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" placeholder="Password" name="password" value="">
    </div>

    <button type="submit" class="btn btn-primary">Login</button>
</form>`;

let notificationError = (msg) => html`
<section class="notifications">
    <p class="notification-message" id="errorBox">${msg}</p>
</section>`;

let notificationSuccess = (msg) => html`
<section class="notifications" style="background-color:rgba(1, 131, 29, 0.541);">
    <p class="notification-message" id="successBox">${msg}</p>
</section>`;

export async function loginPage(ctx) {
    console.log('login');
    ctx.render(loginTemplate(submit));

    async function submit(ev) {
        ev.preventDefault();
        let form = new FormData(ev.target);

        let email = form.get('email');
        let password = form.get('password');

        let response = await login(email, password);

        if (response.status == 200) {
            ctx.render(notificationSuccess('Login successful.'));
            setTimeout(() => {
                ctx.page.redirect('/');
            }, 1000);
        } else {
            ctx.render(loginTemplate(submit, response));
        }

    }

}