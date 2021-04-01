import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllItems, getItemById , updateItem} from '../api/data.js';

let homeTemplate = (token, result, likePet, filter) => html`
${token == null 
? html`
    <section class="basic">
        <h1> Welcome to pet my pet!</h1>
    </section>` 
: html`
<section class="dashboard">
    <h1>Dashboard</h1>
    <nav class="navbar">
        <ul @click=${filter}>
            <li><a href="/">All</a></li>
            <li><a href="/category/Cat">Cats</a></li>
            <li><a href="/category/Dog">Dogs</a></li>
            <li><a href="/category/Parrot">Parrots</a></li>
            <li><a href="/category/Reptile">Reptiles</a></li>
            <li><a href="/category/Other">Other</a></li>
        </ul>
    </nav>
    <ul class="other-pets-list">
        ${result.map(pet => petTemplate(pet, likePet))}
    </ul>
</section>`}`;

let petTemplate = (pet, likePet) => html`
<li class="otherPet" data-id=${pet._id}>
    <h3>Name: ${pet.name}</h3>
    <p>Category: ${pet.category}</p>
    <p class="img"><img src="${pet.imageURL}">
    </p>
    <p class="description">${pet.description}</p>
    <div class="pet-info">
        <a @click=${likePet} href="javascript:void(0)"><button class="button"><i class="fas fa-heart"></i>
                Pet</button></a>
        <a href="/details/${pet._id}"><button class="button">Details</button></a>
        <i class="fas fa-heart"></i> <span> ${pet.likes}</span>
    </div>
</li>`;

export async function homePage(ctx) {
    console.log('homePage');
    let result = [];
    let token = sessionStorage.getItem('token');
    let pets = await getAllItems();
    Object.values(pets).forEach(pet => {
        if(pet.creator != sessionStorage.getItem('userId')) {
            result.push(pet);
        }
    });
    ctx.setUserNav();
    ctx.render(homeTemplate(token, result, likePet, filter));

    async function likePet(ev) {
        let id = ev.target.parentNode.parentNode.parentNode.dataset.id;
        let pet = await getItemById(id);
        let body = Object.assign({}, pet);
        body.likes++;
        await updateItem(id, body);
        ctx.page.redirect('/');
    }

    function filter(ev) {
        let category = ev.target.textContent.substring(0, ev.target.textContent.length-1)
        ctx.page.redirect('/category/' + category);
    }
}