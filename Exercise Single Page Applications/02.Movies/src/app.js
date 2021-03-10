import { setupHome, showHome } from './homePage.js'
import { setupDetails, } from './detailsMovie.js'
import { setupLogin, showLogin } from './loginPage.js'
import { setupRegister, showRegister } from './registerPage.js'
import { setupCreate, showCreate } from './createMovie.js'
import { setupEdit } from './editMovie.js'
import { logout } from './logout.js'

let main = document.querySelector('main');

//setup функции
//•	Get all movies: /data/movies (GET)
setupSection('home-page', setupHome)
//• Delete movie: /data/movies/:id (DELETE)
//• Get number of likes for a movie: /data/likes?where=movieId%3D%22{movieId}%22&distinct=_ownerId&count (GET)
//• Get like for a movie from specific user: /data/likes?where=movieId%3D%22{movieId}%22%20and%20_ownerId%3D%22{userId}%22 (GET)
//• Add a like: /data/likes (POST)
//• Revoke a like: /data/likes/:id (DELETE)
setupSection('movie-example', setupDetails)
setupSection('form-login', setupLogin)
setupSection('form-sign-up', setupRegister)
//•	Create movie: /data/movies (POST)
setupSection('add-movie', setupCreate)
//•	Update movie: /data/movies/:id (PUT)
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
