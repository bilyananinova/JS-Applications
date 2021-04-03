import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';

import { logout } from '../src/api/data.js'
import { errorBox, successBox} from './notification.js';

import { homePage } from './pages/home.js';
import { createPage } from './pages/create.js';
import { editPage } from './pages/edit.js';
import { detailsPage } from './pages/details.js';
import { registerPage } from './pages/register.js';
import { loginPage } from './pages/login.js';

let main = document.querySelector('main');

page('/', middleware, homePage);
page('/create', middleware, createPage);
page('/details/:id', middleware, detailsPage);
page('/edit/:id', middleware, editPage);
page('/register', middleware, registerPage);
page('/login', middleware, loginPage);

setUserNav();
page.start();

document.getElementById('logoutBtn').addEventListener('click', async () => {
    try{
        await logout();   
        setUserNav();
        successBox('Successful logout');
        page.redirect('/login');
    } catch(err) {
        errorBox(err.message);
    }
})

function middleware(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    next();
}

function setUserNav() {
    let token = sessionStorage.getItem('token');
    if (token != null) {
        document.getElementById('welcome-msg').textContent = 'Welcome, ' + sessionStorage.getItem('email');
        [...document.querySelectorAll('.user')].forEach(el => el.style.display = '');
        [...document.querySelectorAll('.guest')].forEach(el => el.style.display = 'none');
    } else {
        [...document.querySelectorAll('.user')].forEach(el => el.style.display = 'none');
        [...document.querySelectorAll('.guest')].forEach(el => el.style.display = '');
    }
}

