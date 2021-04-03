import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../api/data.js';
import { errorBox, successBox} from '../notification.js';

let loginTemplate = (onSubmit) => html`
<form @submit=${onSubmit} class="text-center border border-light p-5" action="" method="">
    <div class="form-group">
        <label for="email">Email</label>
        <input type="email" class="form-control" placeholder="Email" name="email" value="">
    </div>
    <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" placeholder="Password" name="password" value="">
    </div>

    <button type="submit" class="btn btn-primary">Login</button>
</form>`

export async function loginPage(ctx) {
    // console.log('loginPage');
    ctx.render(loginTemplate(onSubmit));

    async function onSubmit(ev) {
        ev.preventDefault();
        let form = new FormData(ev.target);

        let email = form.get('email');
        let password = form.get('password');

        try {
            if (!email || !password) {
                throw new Error('All field are required!')
            } else if (password.length < 6) {
                throw new Error('The password should be at least 6 characters long.')
            }

            await login(email, password);
            ev.target.reset();
            successBox('Login successful.');
            ctx.page.redirect('/')
        } catch (err) {
            errorBox(err.message);
        }
    }

}