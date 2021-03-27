import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';
import { logout } from './api/data.js';

import { homePage } from './views/home.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { registerPage } from './views/register.js';
import { loginPage } from './views/login.js';

let main = document.querySelector('main');
let logoutBtn = document.querySelector('#logoutBtn')
logoutBtn.addEventListener('click', logoutUser);

page('/', middleware, homePage);
page('/create', middleware, createPage);
page('/details/:id', middleware, detailsPage);
page('/edit/:id', middleware, editPage);
page('/register', middleware, registerPage);
page('/login', middleware, loginPage);

setUserNav();
page.start();

function middleware(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    next();
}

function setUserNav() {
    let token = sessionStorage.getItem('token');
    let email = sessionStorage.getItem('email');
    if (token != null) {
        document.getElementById('welcome-msg').textContent = 'Welcome, ' + email;
        [...document.querySelectorAll('.user')].forEach(a => a.style.display = '');
        [...document.getElementsByClassName('guest')].forEach(a => a.style.display = 'none');
    } else {
        [...document.getElementsByClassName('user')].forEach(a => a.style.display = 'none');
        [...document.getElementsByClassName('guest')].forEach(a => a.style.display = 'inline-block');
    }
}

async function logoutUser(ev) {
    await logout();
    setUserNav();
    page.redirect('/');
}