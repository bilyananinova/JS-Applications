import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';

import { logout } from '../src/api/data.js'

import { homePage } from './pages/home.js';
import { loginPage } from './pages/login.js';
import { registerPage } from './pages/register.js';
import { catalogPage } from './pages/catalog.js';
import { createPage } from './pages/create.js';
import { detailsPage } from './pages/details.js';
import { editPage } from './pages/edit.js';
import { myListings } from './pages/myPage.js';
import { searchPage } from './pages/search.js';

let main = document.querySelector('#site-content');

page('/', middleware, homePage);
page('/login', middleware, loginPage);
page('/register', middleware, registerPage);
page('/catalog', middleware, catalogPage);
page('/create', middleware, createPage);
page('/details/:id', middleware, detailsPage);
page('/edit/:id', middleware, editPage);
page('/myListings', middleware, myListings);
page('/search', middleware, searchPage);

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
        document.getElementById('welcome-msg').textContent = 'Welcome ' + sessionStorage.getItem('username')
        document.getElementById('profile').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
    } else {
        document.getElementById('profile').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';
    }
}

