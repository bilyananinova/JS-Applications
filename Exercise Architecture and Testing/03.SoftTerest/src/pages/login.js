import { showHome } from "./home.js";
import { login } from '../api/data.js';

let main;
let section;

async function loginForm(ev) {
    ev.preventDefault();

    let formData = new FormData(ev.target);

    let email = formData.get('email');
    let password = formData.get('password');
    await login(email, password);

    [...document.querySelectorAll('.user-nav')].forEach(e => e.style.display = 'block');
    [...document.querySelectorAll('.guest-nav')].forEach(e => e.style.display = 'none');
    
    showHome();
    ev.target.reset()
}

export function setupLogin(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;

    let form = section.querySelector('.form-user.col-md-7')
    form.addEventListener('submit', (ev) => {
        ev.preventDefault();
        loginForm(ev);
    });
}

export function showLogin() {
    main.innerHTML = '';
    main.appendChild(section);
}