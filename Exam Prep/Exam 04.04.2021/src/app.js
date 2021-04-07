import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';

import { logout } from '../src/api/data.js'

import { homePage } from './pages/home.js';
import { catalogPage } from './pages/catalog.js';
import { detailsPage } from './pages/details.js';
import { editPage } from './pages/edit.js';
import { createPage } from './pages/create.js';
import { loginPage } from './pages/login.js';
import { registerPage } from './pages/register.js';
import { searchPage } from './pages/search.js';

let main = document.querySelector('#main-content');

page('/', middleware, homePage);
page('/catalog', middleware, catalogPage);
page('/details/:id', middleware, detailsPage);
page('/edit/:id', middleware, editPage);
page('/create', middleware, createPage);
page('/login', middleware, loginPage);
page('/register', middleware, registerPage);
page('/search', middleware, searchPage);

setUserNav();
page.start();

document.getElementById('logoutBtn').addEventListener('click', async () => {
    try {
        await logout();
        setUserNav();
        page.redirect('/');

    } catch (err) {
        alert(err.message);
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
        document.getElementById('user').style.display = '';
        document.getElementById('guest').style.display = 'none';
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = '';
    }
}

