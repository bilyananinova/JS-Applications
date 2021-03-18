import { e } from '../dom.js';
import { showDetails } from './details.js';
import { getRecipes } from '../api/data.js';

function createRecipePreview(recipe) {
    const result = e('article', { className: 'preview', onClick: () => showDetails(recipe._id) },
        e('div', { className: 'title' }, e('h2', {}, recipe.name)),
        e('div', { className: 'small' }, e('img', { src: recipe.img })),
    );

    return result;
}

export function setupCatalog(section) {
    return showCatalog()

    async function showCatalog() {
        section.innerHTML = 'Loading&hellip;';

        const recipes = await getRecipes();
        const cards = recipes.map(createRecipePreview);

        const fragment = document.createDocumentFragment();
        cards.forEach(c => fragment.appendChild(c));
        section.innerHTML = '';
        section.appendChild(fragment);

        return section
    }
}