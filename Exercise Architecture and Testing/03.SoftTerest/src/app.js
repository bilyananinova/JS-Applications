import { setupHome, showHome } from './pages/home.js';
import { setupDashboard, showDashboard } from './pages/dashboard.js';
import { setupDetails } from './pages/details.js';
import { setupLogin, showLogin } from './pages/login.js';
import { setupRegister, showRegister } from './pages/register.js';
import { setupCreate, showCreate } from './pages/create.js';

let main = document.querySelector('main');
let nav = document.querySelector('nav');

let links = {
    'homeLink': showHome,
    'loginLink': showLogin,
    'registerLink': showRegister,
    'dashboardLink': showDashboard,
    'createLink': showCreate
}

setupSection('home-page', setupHome);
setupSection('dashboard-holder', setupDashboard);
setupSection('details-page', setupDetails);
setupSection('login-page', setupLogin);
setupSection('register-page', setupRegister);
setupSection('create-page', setupCreate);
document.querySelector('#views').remove();

setUserNav();
showHome();

function setupSection(sectionId, setup) {
    let section = document.getElementById(sectionId);
    setup(main, section);
}


function setUserNav() {
    let token = sessionStorage.getItem('token');
    if (token) {
        [...nav.querySelectorAll('.user-nav')].forEach(e => e.style.display = 'block');
        [...nav.querySelectorAll('.guest-nav')].forEach(e => e.style.display = 'none');
    } else {
        [...nav.querySelectorAll('.user-nav')].forEach(e => e.style.display = 'none');
        [...nav.querySelectorAll('.guest-nav')].forEach(e => e.style.display = 'block');
    }

    document.querySelector('nav').addEventListener('click', (ev) => {
        ev.preventDefault();
        if (ev.target.tagName == 'A' && ev.target.id !== 'logoutBtn' || ev.target.id == 'homeLink') {
            let view = links[ev.target.id];
            if (typeof view == 'function') {
                view();
            }
        } else if (ev.target.id == 'logoutBtn') {
            sessionStorage.clear();
            [...nav.querySelectorAll('.user-nav')].forEach(e => e.style.display = 'none');
            [...nav.querySelectorAll('.guest-nav')].forEach(e => e.style.display = 'block');

            showHome();
        }
    })
}