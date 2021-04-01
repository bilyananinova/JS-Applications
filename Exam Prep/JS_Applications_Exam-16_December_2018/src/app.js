import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';

import { logout } from '../src/api/data.js'

import { homePage } from './pages/home.js';
import { createPage } from './pages/create.js';
import { myPetsPage } from './pages/my-pets.js';
import { detailsPage } from './pages/details.js';
import { deletePetsPage } from './pages/deletePets.js';
import { categoryPage } from './pages/category.js';
import { loginPage } from './pages/login.js';
import { registerPage } from './pages/register.js';

let main = document.querySelector('#site-content');

page('/', middleware, homePage);
page('/create', middleware, createPage);
page('/myPets', middleware, myPetsPage);
page('/details/:id', middleware, detailsPage);
page('/delete/:id', middleware, deletePetsPage);
page('/category/:category', middleware, categoryPage);
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
    let email = sessionStorage.getItem('email');
    if (email != null) {
        document.getElementById('welcome-msg').textContent = 'Welcome, ' + email;
        [...document.querySelectorAll('.user')].forEach(el => el.style.display = '');
        [...document.querySelectorAll('.guest')].forEach(el => el.style.display = 'none');
    } else {
        [...document.querySelectorAll('.user')].forEach(el => el.style.display = 'none');
        [...document.querySelectorAll('.guest')].forEach(el => el.style.display = '');
    }
}

