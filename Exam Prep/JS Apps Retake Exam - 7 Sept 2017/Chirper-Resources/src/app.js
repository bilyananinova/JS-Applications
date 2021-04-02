import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';

import { logout } from '../src/api/data.js'

import { homePage } from './pages/home.js';
import { mePage } from './pages/me.js';
import { prifilePage } from './pages/profile.js';
import { discoverPage } from './pages/discover.js';
import { loginPage } from './pages/login.js';
import { registerPage } from './pages/register.js';

let main = document.querySelector('main');

page('/', middleware, homePage);
page('/me', middleware, mePage);
page('/profile/:profile', middleware, prifilePage);
page('/discover', middleware, discoverPage);
page('/login', middleware, loginPage);
page('/register', middleware, registerPage);

setUserNav();
page.start();

document.getElementById('logoutBtn').addEventListener('click', async () => {
    await logout();
    setUserNav();
})

function middleware(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    next();
}

function setUserNav() {
    let token = sessionStorage.getItem('token');
    if (token == null) {
        document.querySelector('.menu').style.display = 'none'
        page.redirect('/login')
    } else {
        document.querySelector('.menu').style.display = 'block'
    }
}

