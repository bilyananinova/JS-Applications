import { e } from './dom.js'
import { showDetails } from './details.js'

async function getRecipes() {
    const response = await fetch('http://localhost:3030/data/recipes');
    const recipes = await response.json();

    return recipes;
}

export function createRecipePreview(recipe) {
    const result = e('article', { className: 'preview', onClick: () => showDetails(recipe._id) },
        e('div', { className: 'title' }, e('h2', {}, recipe.name)),
        e('div', { className: 'small' }, e('img', { src: recipe.img })),
    );

    return result;

}

let main;
let section;
let setActivNav;

export function setUpCatalog(mainTarget, sectionTarget, setActiveNavCB) {
    main = mainTarget;
    section = sectionTarget;
    setActivNav = setActiveNavCB
}

export async function showCatalog() {
    setActivNav('catalogLink');

    section.innerHTML = '<p style="color: white">Loading...</p>';
    main.innerHTML = '';
    main.appendChild(section);

    const recipes = await getRecipes();
    const cards = recipes.map(createRecipePreview);

    section.innerHTML = '';
    let fragment = document.createDocumentFragment();
    cards.forEach(c => fragment.appendChild(c));
    section.appendChild(fragment);

}
