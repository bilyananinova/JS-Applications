import { getIdeaById, deleteIdeasById } from '../api/data.js';
import { create } from '../dom.js';
import { showDashboard } from './dashboard.js';

let main;
let section;

function createDetails(card) {
    let details = document.createDocumentFragment();
    let img = create('img', ['class=det-img', `src=${card.img}`]);
    details.appendChild(img);
    let div = create('div', ['class=desc']);
    let h2 = create('h2', ['class=display-5'], `${card.title}`);
    let p = create('p', ['class=infoType'], 'Description:');
    let p2 = create('p', ['class=idea-description'], `${card.description}`);
    div.appendChild(h2);
    div.appendChild(p);
    div.appendChild(p2);
    let divCenter = create('div', ['class=text-center']);
    if (sessionStorage.getItem('ownerId') == card._ownerId || sessionStorage.getItem('ownerId') == 'null') {;
        let a = create('a', ['class=btn detb'], 'Delete');
        divCenter.appendChild(a);
        a.addEventListener('click', deleteIdea);
    }
    details.appendChild(div);
    details.appendChild(divCenter);

    return details;

    async function deleteIdea(ev) {
        ev.preventDefault();
        let confirmation = confirm('Are you sure you want to delte this idea? ');
        if (confirmation) {
            await deleteIdeasById(card._id);
            showDashboard();
        }
    }
}

export async function setupDetails(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;
}

export async function showDetails(id) {

    main.innerHTML = '';

    let card = await getIdeaById(id);

    let detail = createDetails(card);
    section.innerHTML = ''
    section.appendChild(detail);
    main.appendChild(section);


}