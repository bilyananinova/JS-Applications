import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';

import { logout } from '../src/api/data.js'

import { homePage } from './pages/home.js';
import { browsePage } from './pages/browseTeam.js';
import { createPage } from './pages/create.js';
import { detailsPage } from './pages/details.js';
import { editPage } from './pages/editTeam.js';
import { loginPage } from './pages/login.js';
import { myTeamsPage } from './pages/myTeams.js';
import { registerPage } from './pages/register.js';

let main = document.querySelector('main');

page('/', middleware, homePage);
page('/browse', middleware, browsePage);
page('/create', middleware, createPage);
page('/myTeams', middleware, myTeamsPage);
page('/details/:id', middleware, detailsPage);
page('/edit/:id', middleware, editPage);
page('/register', middleware, registerPage);
page('/login', middleware, loginPage);

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
    if (token != null) {
        [...document.querySelectorAll('.user')].forEach(li => li.style.display = '');
        [...document.querySelectorAll('.guest')].forEach(li => li.style.display = 'none');
    } else {
        [...document.querySelectorAll('.user')].forEach(li => li.style.display = 'none');
        [...document.querySelectorAll('.guest')].forEach(li => li.style.display = '');
    }
}

