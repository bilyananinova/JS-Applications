import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';

import { homePage } from './views/home.js';
import { catalogPage } from './views/catalog.js';
import { createPage } from './views/create.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { logout } from './api/data.js';
import { notify, loading, success } from './notification.js';

let main = document.querySelector('main');

page('/', middleware, homePage);
page('/catalog', middleware, catalogPage);
page('/create', middleware, createPage);
page('/login', middleware, loginPage);
page('/register', middleware, registerPage);

setUserNav()
page.start();

function middleware(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    next();
}

document.querySelector('#logoutBtn').addEventListener('click', async () => {
    try {
        await logout();
        loading();
        setTimeout(() => {
            success('Logout successful.');
            page.redirect('/login');
            setUserNav();
        }, 1000);
    } catch (err) {
        notify(err.message);
    }
})

function setUserNav() {
    let token = sessionStorage.getItem('accessToken');
    let user = [...document.querySelectorAll('.user')];
    let guest = [...document.querySelectorAll('.guest')];
    if (token != null) {
        document.querySelector('#welcome-msg').textContent = 'Welcome ' + sessionStorage.getItem('email')
        user.forEach(li => li.style.display = '');
        guest.forEach(li => li.style.display = 'none');
    } else {
        user.forEach(li => li.style.display = 'none');
        guest.forEach(li => li.style.display = '');
    }
}