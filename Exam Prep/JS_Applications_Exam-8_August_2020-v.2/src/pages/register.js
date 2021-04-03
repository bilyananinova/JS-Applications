import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/data.js';
import { errorBox, successBox} from '../notification.js';

let registerTemplate = (onSubmit) => html`
        <form @submit=${onSubmit} class="text-center border border-light p-5" action="#" method="post">
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

export async function registerPage(ctx) {
    // console.log('registerPage');
    ctx.render(registerTemplate(onSubmit));

    async function onSubmit (ev) {
        ev.preventDefault();

        let form = new FormData(ev.target);

        let email = form.get('email');
        let password = form.get('password');
        let repeatPassword = form.get('repeatPassword');

        try {
            if(!email || !password || !repeatPassword) {
                throw new Error('All field are required!')
            } else if (password.length < 6) {
                throw new Error('The password should be at least 6 characters long.')
            } else if (password != repeatPassword) {
                throw new Error('The repeat password should be equal to the password')
            }

            await register(email, password);
            ev.target.reset();
            successBox('Successfuly registration!');
            ctx.page.redirect('/')
        } catch (err) {
            errorBox(err.message)
        }
    }
}