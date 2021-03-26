import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../api/data.js';
import { showError } from '../notification.js';

let loginTemplate = (submit, msg) => html`
${msg ? showError(msg) : ''}
<div class="container home wrapper  my-md-5 pl-md-5">
    <div class="row-form d-md-flex flex-mb-equal ">
        <div class="col-md-4">
            <img class="responsive" src="./images/idea.png" alt="">
        </div>
        <form @submit=${submit} class="form-user col-md-7">
            <div class="text-center mb-4">
                <h1 class="h3 mb-3 font-weight-normal">Login</h1>
            </div>
            <div class="form-label-group">
                <label for="inputUsername">Username</label>
                <input type="text" id="inputUsername" name="username" class="form-control" placeholder="Username"
                    required="" autofocus="">
            </div>
            <div class="form-label-group">
                <label for="inputPassword">Password</label>
                <input type="password" id="inputPassword" name="password" class="form-control" placeholder="Password"
                    required="">
            </div>
            <div class="text-center mb-4 text-center">
                <button class="btn btn-lg btn-dark btn-block" type="submit">Sign In</button>
                <p class="alreadyUser"> Don't have account? Then just
                    <a href="/register">Sign-Up</a>!
                </p>
            </div>
            <p class="mt-5 mb-3 text-muted text-center">© SoftTerest - 2019.</p>
        </form>
    </div>
</div>`;

export async function loginPage(ctx) {
    console.log('login');


    async function submit(ev) {
        ev.preventDefault();
        let form = new FormData(ev.target);

        let username = form.get('username').trim();
        let password = form.get('password').trim();

        let response = await login(username, password);

        if (response.status == 200) {

            setTimeout(() => {
                ctx.page.redirect('/dashboard')
            }, 500)

        } else {

            ctx.render(loginTemplate(submit, response))
        }
    }

    ctx.render(loginTemplate(submit))

}