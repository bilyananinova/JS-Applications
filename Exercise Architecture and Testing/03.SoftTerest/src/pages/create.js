import { createIdeas } from '../api/data.js';
import { createCard, showDashboard } from './dashboard.js';

let main;
let section;

async function create(ev) {

    let formData = new FormData(ev.target);

    let title = formData.get('title');
    let description = formData.get('description');
    let img = formData.get('imageURL');

    try {
        let result = await createIdeas({ title, description, img });
        createCard(result);
        showDashboard();
        ev.target.reset();
    } catch (err) {
        alert(err.message);
    }
}

export async function setupCreate(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;

    let form = section.querySelector('.form-idea.col-md-5');

    form.addEventListener('submit', (ev) => {

        ev.preventDefault();
        create(ev)

    })
}

export async function showCreate() {
    main.innerHTML = '';
    main.appendChild(section);
}

