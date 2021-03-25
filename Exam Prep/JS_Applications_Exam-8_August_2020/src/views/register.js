import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/data.js';

let registerTemplate = (submit, msg) => html`

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

    <div class="form-group">
        <label for="repeatPassword">Repeat Password</label>
        <input type="password" class="form-control" placeholder="Repeat-Password" name="repeatPassword" value="">
    </div>

    <button type="submit" class="btn btn-primary">Register</button>
</form>`;

let notificationSuccess = (msg) => html`
<section class="notifications successBox" style="background-color:rgba(1, 131, 29, 0.541);">
    <p class="notification-message" id="successBox">${msg}</p>
</section>`;

let notificationError = (msg) => html`
<section class="notifications">
    <p class="notification-message" id="errorBox">${msg}</p>
</section>`;

export async function registerPage(ctx) {
    console.log('register');
    ctx.render(registerTemplate(submit));

    async function submit(ev) {
        ev.preventDefault();

        let formData = new FormData(ev.target);
        let email = formData.get('email').trim();
        let password = formData.get('password').trim();
        let rePass = formData.get('repeatPassword').trim();

        if (email == '' || password == '' || rePass == '') {
            ctx.render(registerTemplate(submit, 'All field are required!'));
        } else if (password != rePass) {
            ctx.render(registerTemplate(submit, 'Password don\'t match!'));
        } else if (password.length <= 6) {
            ctx.render(registerTemplate(submit, 'The password should be at least 6 characters long!'));
        } else {
            let response = await register(email, password);

            if (response.status == 200) {
                ctx.render(notificationSuccess('Successful registration!'));
                setTimeout(() => {
                    ctx.page.redirect('/');
                }, 1000);
            } else {
                ctx.render(registerTemplate(submit, response));
            }
        }
    }
}