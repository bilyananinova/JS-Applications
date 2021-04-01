import { html } from '../../node_modules/lit-html/lit-html.js';
import { getItemById, updateItem } from '../api/data.js';



let detailsMyPetsTemplate = (pet, editPet) => html`<section class="detailsMyPet">
    <h3>${pet.name}</h3>
    <p>Pet counter: <i class="fas fa-heart"></i>${pet.likes}</p>
    <p class="img"><img src=${pet.imageURL}></p>
    <form @submit=${editPet} action="#" method="POST">
        <textarea type="text" name="description">${pet.description}</textarea>
        <button class="button">Save</button>
    </form>
</section>`;

let detailsOtherPetsTemplate = (pet, likePet) => html`<section class="detailsOtherPet">
    <h3>${pet.name}</h3>
    <p>Pet counter: ${pet.likes} <a @click=${likePet} href="javascript:void(0)"><button class="button"><i
                    class="fas fa-heart"></i>
                Pet</button></a>
    </p>
    <p class="img"><img src=${pet.imageURL}></p>
    <p class="description">${pet.description}</p>
</section>`;


export async function detailsPage(ctx) {
    // console.log('detailsPage', ctx.params.id]);
    let pet = await getItemById(ctx.params.id)
    if (pet.creator == sessionStorage.getItem('userId')) {
        ctx.render(detailsMyPetsTemplate(pet, editPet));
    } else {
        ctx.render(detailsOtherPetsTemplate(pet, likePet));
    }

    async function editPet(ev) {
        ev.preventDefault();
        let form = new FormData(ev.target);
        let description = form.get('description');
        let body = Object.assign({}, pet);
        body.description = description;
        await updateItem(ctx.params.id, body);
        ctx.page.redirect('/');
    }

    async function likePet(ev) {
        ev.preventDefault();
        let body = Object.assign({}, pet);
        body.likes++
        await updateItem(ctx.params.id, body);
        ctx.page.redirect('/details/' + ctx.params.id);
    }
}