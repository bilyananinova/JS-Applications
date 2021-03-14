import { showHome } from "./home.js";
import { register } from '../api/data.js';

let main;
let section;

async function registerForm(ev) {

    let formData = new FormData(ev.target);

    let email = formData.get('email');
    let password = formData.get('password');
    let rePassword = formData.get('repeatPassword');

    if (email.length <= 3 || password.length <= 3) {
        return alert('Email and password should be at least 3 characters');
    } else if (password != rePassword) {
        return alert('Passwords don\'t match!');
    }

    await register(email, password);

    [...document.querySelectorAll('.user-nav')].forEach(e => e.style.display = 'block');
    [...document.querySelectorAll('.guest-nav')].forEach(e => e.style.display = 'none');

    showHome();

    ev.target.reset();
}

export function setupRegister(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;

    let form = section.querySelector('.form-user.col-md-7')
    form.addEventListener('submit', (ev) => {
        ev.preventDefault();
        registerForm(ev);
    });
}

export function showRegister() {
    main.innerHTML = '';
    main.appendChild(section);
}