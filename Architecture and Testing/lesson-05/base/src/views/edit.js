import { showDetails } from './details.js';
import { getRecipeById, editRecipeById } from '../api/data.js'

let main;
let section;
let setActiveNav;
let recipeId;

export function setupEdit(targetMain, targetSection, onActiveNav) {
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
        const body = {
            name: data.name,
            img: data.img,
            ingredients: data.ingredients.split('\n').map(l => l.trim()).filter(l => l != ''),
            steps: data.steps.split('\n').map(l => l.trim()).filter(l => l != '')
        };

        await editRecipeById(recipeId, body)
        showDetails(recipeId);
    }
}


export async function showEdit(id) {
    setActiveNav();
    main.innerHTML = '';
    main.appendChild(section);

    recipeId = id;
    const recipe = await getRecipeById(recipeId);

    section.querySelector('[name="name"]').value = recipe.name;
    section.querySelector('[name="img"]').value = recipe.img;
    section.querySelector('[name="ingredients"]').value = recipe.ingredients.join('\n');
    section.querySelector('[name="steps"]').value = recipe.steps.join('\n');
}