import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';
import { logout } from './api/data.js';

import { homePage } from './views/home.js';
import { dashboardPage } from './views/dashboard.js';
import { createPage } from './views/create.js';
import { registerPage } from './views/register.js';
import { loginPage } from './views/login.js';
import { detailsPage } from './views/details.js';

let main = document.querySelector('main');

page('/', middleware, homePage);
page('/dashboard', middleware, dashboardPage);
page('/create', middleware, createPage);
page('/register', middleware, registerPage);
page('/login', middleware, loginPage);
page('/details/:id', middleware, detailsPage);

setUserNav();
page.start();

document.querySelector('.logoutBtn').addEventListener('click', async () => {
    await logout();
    setUserNav();
    page.redirect('/');
})

function middleware(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    next();
}

function setUserNav() {
    let token = sessionStorage.getItem('token');
    if (token != null) {
        [...document.getElementsByClassName('user')].forEach(a => a.style.display = 'inline-block');
        [...document.getElementsByClassName('guest')].forEach(a => a.style.display = 'none');
    } else {
        [...document.getElementsByClassName('user')].forEach(a => a.style.display = 'none');
        [...document.getElementsByClassName('guest')].forEach(a => a.style.display = 'inline-block');
    }
}