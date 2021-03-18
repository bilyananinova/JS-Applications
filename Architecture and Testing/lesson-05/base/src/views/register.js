import { register } from '../api/data.js';


let main;
let section;
let setActiveNav;

export function setupRegister(targetMain, targetSection, onActiveNav) {
    main = targetMain;
    section = targetSection;
    setActiveNav = onActiveNav;
    const form = targetSection.querySelector('form');

    form.addEventListener('submit', (ev => {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        onSubmit([...formData.entries()].reduce((p, [k, v]) => Object.assign(p, { [k]: v }), {}));
    }));

    async function onSubmit(data) {
        if (data.password != data.rePass) {
            return alert('Passwords don\'t match');
        }

        await register(data.email, data.password)

        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';

        showCatalog();
    }
}


export function showRegister() {
    setActiveNav('registerLink');
    main.innerHTML = '';
    main.appendChild(section);
}