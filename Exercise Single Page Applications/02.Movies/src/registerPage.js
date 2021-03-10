import { showHome } from "./homePage.js";

async function register(ev) {

    let formData = new FormData(ev.target);

    let email = formData.get('email');
    let password = formData.get('password');
    let repass = formData.get('repeatPassword');

    if (email == '' || password == '' || repass == '') {
        return alert('All field are required!');
    } else if (password.length < 6) {
        return alert('Password must be at least 6 symbols!');
    } else if (password != repass) {
        return  alert('Passwords don\'t match!');
    }

    let response = await fetch('http://localhost:3030/users/register', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })

    let data = await response.json();
    if (response.ok) {
        sessionStorage.setItem('accessToken', data.accessToken);
        sessionStorage.setItem('ownerId', data._id);
        sessionStorage.setItem('email', data.email);
        showHome()
    } else {
        return alert(data.message);
    }

    ev.target.reset()
}
let main;
let section;

export function setupRegister(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;

    let form = section.querySelector('.text-center.border.border-light.p-5')
    form.addEventListener('submit', (ev) => {
        ev.preventDefault();
        register(ev);
    });
}

export function showRegister() {
    main.innerHTML = '';
    main.appendChild(section)
}

