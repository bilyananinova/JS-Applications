import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../api/data.js';

let loginTemplate = (submit) => html`

<h1>Login</h1>
<p class="form-info">Don't have account?
    <a href="../user/register.html">Register now</a> and fix that!
</p>
<form @submit=${submit} action="">
    <div>
        <input type="email" placeholder="Email..." name="email">
    </div>

    <div>
        <input type="password" placeholder="Password..." name="password">
    </div>
    <div>
        <button>Login</button>
    </div>
</form>
`;

export async function loginPage(ctx) {
    console.log('login');


    async function submit(ev) {
        ev.preventDefault();
        let form = new FormData(ev.target);

        let email = form.get('email').trim();
        let password = form.get('password').trim();

        let response = await login(email, password);

        if (response.status == 200) {

            setTimeout(() => {
                ctx.page.redirect('/')
                
            }, 500)

        } else {

            ctx.render(loginTemplate(submit))
        }
    }

    ctx.render(loginTemplate(submit))

}