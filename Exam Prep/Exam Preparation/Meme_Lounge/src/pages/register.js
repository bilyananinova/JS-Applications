import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/data.js';
import { notify } from '../notifications.js';

let registerTemplate = (submit) => html`
<!-- Register Page ( Only for guest users ) -->
<section id="register">
    <form @submit=${submit} id="register-form">
        <div class="container">
            <h1>Register</h1>
            <label for="username">Username</label>
            <input id="username" type="text" placeholder="Enter Username" name="username">
            <label for="email">Email</label>
            <input id="email" type="text" placeholder="Enter Email" name="email">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">
            <label for="repeatPass">Repeat Password</label>
            <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
            <div class="gender">
                <input type="radio" name="gender" id="female" value="female">
                <label for="female">Female</label>
                <input type="radio" name="gender" id="male" value="male">
                <label for="male">Male</label>
            </div>
            <input type="submit" class="registerbtn button" value="Register">
            <div class="container signin">
                <p>Already have an account?<a href="/login">Sign in</a>.</p>
            </div>
        </div>
    </form>
</section>`;

export async function registerPage(ctx) {
    console.log('registerPage');
    ctx.render(registerTemplate(submit));

    async function submit(ev) {
        ev.preventDefault();

        let form = new FormData(ev.target);
        let username = form.get('username');
        let email = form.get('email');
        let password = form.get('password');
        let repeatPass = form.get('repeatPass');
        let gender = form.get('gender');

        try {
            
            if (!username || !email || !password || !repeatPass || !gender) {
                throw new Error('All fields are required!');
            } else if (password != repeatPass) {
                throw new Error('Passwords don\'t match.');
            }

            await register(email, password, username, gender);
            ctx.setUserNav();
            ctx.page.redirect('/catalog');
        } catch (err) {
            notify(err.message);
        }
    }

}