import page from '../node_modules/page/page.mjs';
import { render } from '../../node_modules/lit-html/lit-html.js';
import { logout } from './api/data.js';

import { homePage } from './views/home.js';
import { registerPage } from './views/register.js';
import { loginPage } from './views/login.js';
import { addPage } from './views/addmovie.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/editmovie.js';

let main = document.querySelector('main');

page('/', middleware, homePage);
page('/register', middleware, registerPage);
page('/login', middleware, loginPage);
page('/addmovie', middleware, addPage);
page('/details/:id', middleware, detailsPage);
page('/edit/:id', middleware, editPage);

setUserNav();
page.start();

document.querySelector('.logoutBtn').addEventListener('click', async () => {
    await logout();
    page.redirect('/');
    setUserNav();
})

function middleware(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    next();
}

function setUserNav() {
    let nav = document.querySelector('nav');
    let token = sessionStorage.getItem('token');
    if (token != null) {
        [...nav.querySelectorAll('.nav-link.user')].forEach(a => a.style.display = 'inline-block');
        [...nav.querySelectorAll('.nav-link.guest')].forEach(a => a.style.display = 'none');
        nav.querySelector('#welcome-msg').textContent = `Welcome, ${sessionStorage.getItem('email')}`;
    } else {
        [...nav.querySelectorAll('.nav-link.user')].forEach(a => a.style.display = 'none');
        [...nav.querySelectorAll('.nav-link.guest')].forEach(a => a.style.display = 'inline-block');
    }
}


