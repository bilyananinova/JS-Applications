import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllItems, deleteItem } from '../api/data.js';

let myPetsTemplate = (result, deletePet) => html`<section class="my-pets">
    <h1>My Pets</h1>
    <ul class="my-pets-list">
        ${result.map(pet => petTemplate(pet, deletePet))}
    </ul>
</section>`;

let petTemplate = (pet, deletePet) => html`
<section class="myPet">
    <h3>Name: ${pet.name}</h3>
    <p>Category: ${pet.category}</p>
    <p class="img"><img src=${pet.imageURL}></p>
    <p class="description">${pet.description}</p>
    <div class="pet-info">
        <a href="/details/${pet._id}"><button class="button">Details</button></a>
        <a @click=${() => deletePet(pet._id)} href="javascript:void(0)"><button class="button">Delete</button></a>
        <i class="fas fa-heart"></i> <span>${pet.likes}</span>
    </div>
</section>`;

export async function myPetsPage(ctx) {
    console.log('createPage');
    let result = [];
    let pets = await getAllItems();
    Object.values(pets).forEach(pet => {
        if (pet.creator == sessionStorage.getItem('userId')) {
            result.push(pet);
        }
    });
    ctx.setUserNav();
    ctx.render(myPetsTemplate(result, deletePet));

    async function deletePet(id) {
        await deleteItem(id);
        ctx.page.redirect('/');
    }

}