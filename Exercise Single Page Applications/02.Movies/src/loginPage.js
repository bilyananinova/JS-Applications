import { showHome } from "./homePage.js";

async function login(ev) {
    ev.preventDefault();

    let formData = new FormData(ev.target);

    let email = formData.get('email');
    let password = formData.get('password');

    let response = await fetch('http://localhost:3030/users/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })

    let data = await response.json()
    if (response.ok) {
        sessionStorage.setItem('accessToken', data.accessToken);
        sessionStorage.setItem('ownerId', data._id);
        sessionStorage.setItem('email', data.email);

        document.querySelector('#welcome-msg').textContent = `Welcome, ${sessionStorage.getItem('email')}`;
        [...document.querySelectorAll('nav .guest')].forEach(l => l.style.display = 'none');
        [...document.querySelectorAll('nav .user')].forEach(l => l.style.display = 'block');

        showHome();
    } else {
        return alert('Wrong password or email')
    }

    ev.target.reset()

}

let main;
let section;

export function setupLogin(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;

    let form = section.querySelector('.text-center.border.border-light.p-5')
    form.addEventListener('submit', (ev) => {
        ev.preventDefault();
        login(ev);
    });
}

export function showLogin() {
    main.innerHTML = '';
    main.appendChild(section)
}