import { html } from '../../node_modules/lit-html/lit-html.js';
import { getItemById, deleteItem } from '../api/data.js';

let detailsTemplate = (car, deleteCar) => html`
<section id="listing-details">
    <h1>Details</h1>
    <div class="details-info">
        <img src="${car.imageUrl}">
        <hr>
        <ul class="listing-props">
            <li><span>Brand:</span>${car.brand}</li>
            <li><span>Model:</span>${car.model}</li>
            <li><span>Year:</span>${car.year}</li>
            <li><span>Price:</span>${car.price}$</li>
        </ul>

        <p class="description-para">${car.description}</p>

        ${sessionStorage.getItem('userId') == car._ownerId 
            ? html `
        <div class="listings-buttons">
            <a href="/edit/${car._id}" class="button-list">Edit</a>
            <a @click=${deleteCar} href="javascript:void(0)" class="button-list">Delete</a>
        </div>`
            : ''}
        
    </div>
</section>`;



export async function detailsPage(ctx) {
    console.log('detailsPage', ctx.params.id);
    let car = await getItemById(ctx.params.id)
    ctx.render(detailsTemplate(car, deleteCar));

    async function deleteCar() {
        let confirmation = confirm('Are you sure you want to delte this car?');
        if (confirmation) {
            await deleteItem(ctx.params.id);
            ctx.page.redirect('/catalog')
        }
    }

}