import { getIdeas } from '../api/data.js';
import { create } from '../dom.js';
import { showDetails } from './details.js';

let main;
let section;

export function createCard(idea) {
    let div = create('div', ['class=card overflow-hidden current-card details', `id=${idea._id}`]);
    div.style.width = '20rem';
    div.style.height = '18rem';
    div.innerHTML = `
    <div class="card-body">
        <p class="card-text">${idea.title}</p>
    </div>
    <img class="card-image" src=${idea.img} alt="Card image cap">
    <a  class="btn">Details</a>`

    return div;
}

export async function setupDashboard(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;
}

export async function showDashboard() {
    main.innerHTML = '';
    section.innerHTML = '';
    section.addEventListener('click', (ev) => {
        ev.preventDefault();

        if (ev.target.classList.contains('btn')) {
            showDetails(ev.target.parentNode.id);
        }
    })
    let ideas = await getIdeas();

    if (ideas.length > 0) {
        let cards = ideas.map(createCard);

        cards.forEach(c => {
            section.appendChild(c);
        });
    } else {
        section.innerHTML = `<h1>No ideas yet! Be the first one :)</h1>`;
    }

    main.appendChild(section);
}