import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';

import { logout } from '../src/api/data.js'

import { createPage } from './pages/create.js';
import { dashboardPage } from './pages/dashboard.js';
import { detailsPage } from './pages/details.js';
import { editPage } from './pages/edit.js';
import { loginPage } from './pages/login.js';
import { myPage } from './pages/my-page.js';
import { registerPage } from './pages/register.js';

let main = document.querySelector('.container');

page('/', middleware, dashboardPage);
page('/dashboard', middleware, dashboardPage);
page('/myFurniture', middleware, myPage);
page('/details/:id', middleware, detailsPage);
page('/create', middleware, createPage);
page('/edit/:id', middleware, editPage);
page('/register', middleware, registerPage);
page('/login', middleware, loginPage);

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
    if (token != null) {
        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';
    }
}

