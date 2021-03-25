import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';
import { logout } from './api/data.js';

import { homePage } from './views/home.js';
import { createPage } from './views/create.js';
import { registerPage } from './views/register.js';
import { loginPage } from './views/login.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';

let main = document.querySelector('main');

page('/', middleware, homePage);
page('/create', middleware, createPage);
page('/register', middleware, registerPage);
page('/login', middleware, loginPage);
page('/details/:id', middleware, detailsPage);
page('/edit/:id', middleware, editPage);

setUserNav();
page.start();

document.getElementById('logoutBtn').addEventListener('click', async () => {
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
        [...document.querySelectorAll('.user')].forEach(a => a.style.display = 'inline-block');
        [...document.querySelectorAll('.guest')].forEach(a => a.style.display = 'none');
    } else {
        [...document.querySelectorAll('.user')].forEach(a => a.style.display = 'none');
        [...document.querySelectorAll('.guest')].forEach(a => a.style.display = 'inline-block');
    }
}
