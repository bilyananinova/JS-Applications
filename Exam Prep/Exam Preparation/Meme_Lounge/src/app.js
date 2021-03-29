import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';

import { logout } from '../src/api/data.js'

import { homePage } from './pages/home.js';
import { catalogPage } from './pages/catalog.js';
import { createPage } from './pages/create.js';
import { detailsPage } from './pages/details.js';
import { editPage } from './pages/edit.js';
import { profilePage } from './pages/profile.js';
import { loginPage } from './pages/login.js';
import { registerPage } from './pages/register.js';

let main = document.querySelector('main');

page('/', middleware, homePage);
page('/catalog', middleware, catalogPage);
page('/create', middleware, createPage);
page('/details/:id', middleware, detailsPage);
page('/edit/:id', middleware, editPage);
page('/myProfile', middleware, profilePage);
page('/login', middleware, loginPage);
page('/register', middleware, registerPage);

setUserNav();
page.start();

document.getElementById('logoutBtn').addEventListener('click', async () => {
    await logout();
    setUserNav();
    page.redirect('/')
})

function middleware(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    next();
}

function setUserNav() {
    let token = sessionStorage.getItem('token');
    let username = sessionStorage.getItem('username');
    if (token != null) {
        document.querySelector('#welcome-msg').textContent = 'Welcome, ' + username;
        document.querySelector('.user').style.display = '';
        document.querySelector('.guest').style.display = 'none';
    } else {
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.guest').style.display = '';
    }
}

