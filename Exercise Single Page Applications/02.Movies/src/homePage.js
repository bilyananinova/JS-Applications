import { create } from './dom.js'
import { showDetails } from './detailsMovie.js'

async function getAllMovies() {
    let response = await fetch('http://localhost:3030/data/movies');
    let data = await response.json();
    return data;
}

function createPreview(movie) {
    let card = create('div', ['class=card mb-4']);
    let img = create('img', ['class=card-img-top', `src=${movie.img}`]);
    let divTitle = create('div', ["class=card-body"]);
    let title = create('h4', ["class=card-title"], `${movie.title}`);
    divTitle.appendChild(title);
    let footerCard = create('div', ["class=card-footer"]);
    let a = create('a', ['href=#']);
    let button = create('button', ["type=button", `id=${movie._id}`, 'class=btn btn-info movieDetailsLink'], 'Details');
    a.appendChild(button);
    footerCard.appendChild(a);
    footerCard.appendChild(button);

    card.appendChild(img);
    card.appendChild(divTitle);
    card.appendChild(footerCard);

    return card;

}

let main;
let section;
let container;

export function setupHome(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;
    container = section.querySelector('.card-deck.d-flex.justify-content-center');

    container.addEventListener('click', (ev) => {
        ev.preventDefault()
        if (ev.target.classList.contains('movieDetailsLink')) {
            showDetails(ev.target.id);
        }
    })
}

export async function showHome() {
    main.innerHTML = '';
    main.appendChild(section);

    let movies = await getAllMovies();
    let cards = movies.map(createPreview);
    let fragment = document.createDocumentFragment();
    cards.forEach(c => {
        fragment.appendChild(c);
    });

    container.innerHTML = '';
    container.appendChild(fragment);

    
}