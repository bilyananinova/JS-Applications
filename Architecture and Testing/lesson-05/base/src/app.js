import { logout as apiLogout } from './api/data.js'
import { setupCatalog } from './views/catalog.js';
import { setupCreate, showCreate } from './views/create.js';
import { setupLogin, showLogin } from './views/login.js';
import { setupRegister, showRegister } from './views/register.js';
import { setupDetails } from './views/details.js';
import { setupEdit } from './views/edit.js';

import { createNavigation } from './nav.js'


window.addEventListener('load', async () => {
    setUserNav();

    const main = document.querySelector('main');
    const nav = document.querySelector('nav');

    let navigation = createNavigation(main, nav)
    navigation.registerView('catalog', document.getElementById('catalog'), setupCatalog, 'catalogLink')

    navigation.goTo
    /*
        let showCatalog = setupCatalog(main, document.getElementById('catalog'), setActiveNav);
        setupCreate(main, document.getElementById('create'), setActiveNav);
        setupLogin(main, document.getElementById('login'), setActiveNav);
        setupRegister(main, document.getElementById('register'), setActiveNav);
        setupDetails(main, document.getElementById('details'), setActiveNav);
        setupEdit(main, document.getElementById('edit'), setActiveNav);
        document.getElementById('views').remove();
    
    
        const links = {
            'catalogLink': showCatalog,
            'createLink': showCreate,
            'loginLink': showLogin,
            'registerLink': showRegister,
            'logoutBtn': logout,
        };
        setupNavigation();
    
        // Start application in catalog view
        showCatalog();
        
        function setupNavigation() {
            nav.addEventListener('click', (ev) => {
                if (ev.target.tagName == 'A') {
                    const handler = links[ev.target.id];
                    if (handler) {
                        ev.preventDefault();
                        handler();
                    }
                }
            });
        }
        
        */
    function setActiveNav(targetId) {
        [...nav.querySelectorAll('a')].forEach(a => a.id == targetId ? a.classList.add('active') : a.classList.remove('active'));
    }


    function setUserNav() {
        if (sessionStorage.getItem('authToken') != null) {
            document.getElementById('user').style.display = 'inline-block';
            document.getElementById('guest').style.display = 'none';
        } else {
            document.getElementById('user').style.display = 'none';
            document.getElementById('guest').style.display = 'inline-block';
        }
    }

    async function logout() {
        await apiLogout()
        setUserNav();
        // showCatalog();
    }
});
