import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/data.js';

let registerTemplate = (submit) => html`
<h1>Register</h1>
<p class="form-info">Already registered?
    <a href="/login">Login now</a> and have some fun!
</p>

<form @submit=${submit}action="">
    <div>
        <input type="email" placeholder="Email..." name="email">
    </div>
    <div>
        <input type="password" placeholder="Password" name="password">
    </div>
    <div>
        <input type="password" placeholder="Re-password" name="repassword">
    </div>
    <div>
        <p class="message"></p>
        <button>Register</button>
    </div>
</form>
`;

export async function registerPage(ctx) {
    console.log('register');

    async function submit(ev) {
        ev.preventDefault();
        console.log('register');

        let formData = new FormData(ev.target);

        let email = formData.get('email').trim();
        let password = formData.get('password').trim();
        let rePass = formData.get('repassword').trim();

        console.log(email);
        console.log(password);
        console.log(rePass);
        
        if (email == '' || password == '' || rePass == '') {
            throw new Error ('All field are required!');
        } else if (password != rePass) {
            throw new Error ('Password don\'t match!');
        } else if (password.length < 6 || email.length < 6) {
            throw new Error ('The password and username should be at least 6 characters long!');
        } else {
            let response = await register(email, password);

            if (response.status == 200) {
                setTimeout(() => {
                    ctx.page.redirect('/');
                }, 1000);
            } else {
                ctx.render(registerTemplate(submit));
            }
        }

    }

    ctx.render(registerTemplate(submit));

}