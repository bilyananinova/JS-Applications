import { setUpCatalog, showCatalog } from './catalog.js';
import { setUpLogin, showLogin } from './login.js';
import { setUpRegister, showRegister } from './register.js';
import { setUpCreate, showCreate } from './create.js';




main();

function main() {
    setUserNav()
    let nav = document.querySelector('nav');
    const main = document.querySelector('main');
    let catalogSection = document.getElementById('catalogSection');
    let loginSection = document.getElementById('loginSection');
    let registerSection = document.getElementById('registerSection');
    let createSection = document.getElementById('createSection');

    let links = {
        'catalogLink': showCatalog,
        'loginLink': showLogin,
        'registerLink': showRegister,
        'createLink': showCreate
    }

    setUpCatalog(main, catalogSection);
    setUpLogin(main, loginSection, () => { setUserNav(); setActivNav('catalogLink'); showCatalog(); });
    setUpRegister(main, registerSection, () => { setUserNav(); setActivNav('catalogLink'); showCatalog(); });
    setUpCreate(main, createSection, () => { setActivNav('catalogLink'); showCatalog() });
    setUpNavigation();

    showCatalog();

    function setActivNav(targetId) {
        [...nav.querySelectorAll('a')].forEach(l => {
            if (l.id == targetId) {
                l.classList.add('active')
            } else {
                l.classList.remove('active')
            }
        })
    }

    function setUpNavigation() {
        nav.addEventListener('click', (ev) => {
            if (ev.target.tagName == 'A') {
                console.log(ev.target.id);
                let view = links[ev.target.id]
                if (typeof view == 'function') {
                    ev.preventDefault();
                    setActivNav(ev.target.id);
                    view();
                }
            }
        })
    }



    function setUserNav() {
        if (sessionStorage.getItem('authToken') != null) {
            document.getElementById('user').style.display = 'inline-block';
            document.getElementById('guest').style.display = 'none';
            document.getElementById('logoutBtn').addEventListener('click', logout);
        } else {
            document.getElementById('guest').style.display = 'inline-block';
            document.getElementById('user').style.display = 'none';
        }
    }

    async function logout() {
        const response = await fetch('http://localhost:3030/users/logout', {
            method: 'get',
            headers: {
                'X-Authorization': sessionStorage.getItem('authToken')
            },
        });
        if (response.status == 200) {
            sessionStorage.removeItem('authToken');
            setUserNav();
            showCatalog();
        } else {
            console.error(await response.json());
        }
    }


}