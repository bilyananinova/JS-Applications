import { showDashboard } from './dashboard.js';

let main;
let section;

export function setupHome(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;

    section.querySelector('a').addEventListener('click', (ev) => {
        ev.preventDefault();
        showDashboard();
    })
}

export async function showHome() {
    main.innerHTML = '';
    main.appendChild(section);
}