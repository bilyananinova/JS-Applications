import { setupHome, showHome } from './homePage.js'
import { setupDetails, } from './detailsMovie.js'
import { setupLogin, showLogin } from './loginPage.js'
import { setupRegister, showRegister } from './registerPage.js'
import { setupCreate, showCreate } from './createMovie.js'
import { setupEdit } from './editMovie.js'
import { logout } from './logout.js'

let main = document.querySelector('main');

setupSection('home-page', setupHome)
setupSection('movie-example', setupDetails)
setupSection('form-login', setupLogin)
setupSection('form-sign-up', setupRegister)
setupSection('add-movie', setupCreate)
setupSection('edit-movie', setupEdit)
setupNavigation();

showHome();

function setupSection(sectionId, setup) {
    let section = document.getElementById(sectionId)
    setup(main, section)
}

let links = {
    'homeLink': showHome,
    'loginLink': showLogin,
    'registerLink': showRegister,
    // 'createLink': showCreate,
}

function setupNavigation() {

    if (sessionStorage.getItem('email') !== null) {
        document.querySelector('#welcome-msg').textContent = `Welcome, ${sessionStorage.getItem('email')}`;
        [...document.querySelectorAll('nav .guest')].forEach(l => l.style.display = 'none');
        [...document.querySelectorAll('nav .user')].forEach(l => l.style.display = 'block');
    } else {
        [...document.querySelectorAll('nav .guest')].forEach(l => l.style.display = 'block');
        [...document.querySelectorAll('nav .user')].forEach(l => l.style.display = 'none');
    }

    document.querySelector('nav').addEventListener('click', (ev) => {
        ev.preventDefault();
        if (ev.target.tagName == 'A' && ev.target.id !== 'loagoutBtn') {
            let view = links[ev.target.id];

            if (typeof view == 'function') {
                view();
            }
        } else if (ev.target.id == 'loagoutBtn') {
            logout();
        }
    })

    document.getElementById('createLink').addEventListener('click', (ev) => {
        ev.preventDefault();
        showCreate();
    })
}
