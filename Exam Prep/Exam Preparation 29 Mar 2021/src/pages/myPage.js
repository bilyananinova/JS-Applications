import { html } from '../../node_modules/lit-html/lit-html.js';
import { getItemByUserId } from '../api/data.js';

let myPageTemplate = (listings) => html`
<section id="my-listings">
    <h1>My car listings</h1>
    <div class="listings">

        ${listings.length > 0 
        ? html `
        ${listings.map(listing => carTemplate(listing))}
        ` 
        : html `
            <p class="no-cars"> You haven't listed any cars yet.</p>
        `}
        
    </div>
</section>`;

let carTemplate = (car) => html`
<div class="listing">
    <div class="preview">
        <img src=${car.imageUrl}>
    </div>
    <h2>${car.brand} ${car.model}</h2>
    <div class="info">
        <div class="data-info">
            <h3>Year: ${car.year}</h3>
            <h3>Price: ${car.price} $</h3>
        </div>
        <div class="data-buttons">
            <a href="/details/${car._id}" class="button-carDetails">Details</a>
        </div>
    </div>
</div>`;

export async function myListings(ctx) {
    console.log('myListings');
    let listings = await getItemByUserId(sessionStorage.getItem('userId'));
    ctx.render(myPageTemplate(listings));
}