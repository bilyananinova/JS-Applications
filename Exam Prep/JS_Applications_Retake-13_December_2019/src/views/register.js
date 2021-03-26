import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/data.js';
import { showError } from '../notification.js';

let registerTemplate = (submit, msg) => html`
${msg ? showError(msg) : ''}
<div class="container home wrapper  my-md-5 pl-md-5">
    <div class="row-form d-md-flex flex-mb-equal ">
        <div class="col-md-4">
            <img class="responsive" src="./images/idea.png" alt="">
        </div>
        <form @submit=${submit} class="form-user col-md-7" action="" method="">
            <div class="text-center mb-4">
                <h1 class="h3 mb-3 font-weight-normal">Register</h1>
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
            <div class="form-label-group">
                <label for="inputRepeatPassword">Repeat Password</label>
                <input type="password" id="inputRepeatPassword" name="repeatPassword" class="form-control"
                    placeholder="Repeat Password" required="">
            </div>
            <button class="btn btn-lg btn-dark btn-block" type="submit">Sign Up</button>
            <div class="text-center mb-4">
                <p class="alreadyUser"> Don't have account? Then just
                    <a href="/login">Sign-Up</a>!
                </p>
            </div>
            <p class="mt-5 mb-3 text-muted text-center">© SoftTerest - 2019.</p>
        </form>
    </div>
</div>`;

export async function registerPage(ctx) {
    console.log('register');

    async function submit(ev) {
        ev.preventDefault();
        console.log('register');

        let formData = new FormData(ev.target);

        let username = formData.get('username').trim();
        let password = formData.get('password').trim();
        let rePass = formData.get('repeatPassword').trim();

        if (username == '' || password == '' || rePass == '') {
            ctx.render(registerTemplate(submit, 'All field are required!'));
        } else if (password != rePass) {
            ctx.render(registerTemplate(submit, 'Password don\'t match!'));
        } else if (password.length < 3 || username.length < 3) {
            ctx.render(registerTemplate(submit, 'The password and username should be at least 6 characters long!'));
        } else {
            let response = await register(username, password);

            if (response.status == 200) {
                setTimeout(() => {
                    ctx.page.redirect('/dashboard');
                }, 1000);
            } else {
                ctx.render(registerTemplate(submit, false, response));
            }
        }

    }

    ctx.render(registerTemplate(submit));

}