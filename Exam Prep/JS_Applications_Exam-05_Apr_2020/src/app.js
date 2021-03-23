import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';
import { logout } from './api/data.js';

import { homePage } from './views/homePage.js';
import { createPage } from './views/createPage.js';
import { registerPage } from './views/registerPage.js';
import { detailsPage } from './views/detailsPage.js';
import { editPage } from './views/editPage.js';

let main = document.querySelector('main');

page('/', middleware, homePage);
page('/create', middleware, createPage);
page('/register', middleware, registerPage);
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
        document.querySelector('.guest').style.display = 'none';
    } else {
        [...document.querySelectorAll('.user')].forEach(a => a.style.display = 'none');
        document.querySelector('.guest').style.display = 'inline-block';
    }
}
