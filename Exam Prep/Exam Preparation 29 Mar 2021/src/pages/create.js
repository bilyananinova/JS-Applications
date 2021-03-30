import { html } from '../../node_modules/lit-html/lit-html.js';
import { createItem } from '../api/data.js';

let createTemplate = (submit) => html`
<section id="create-listing">
    <div class="container">
        <form @submit=${submit} id="create-form">
            <h1>Create Car Listing</h1>
            <p>Please fill in this form to create an listing.</p>
            <hr>

            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand">

            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model">

            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description">

            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year">

            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl">

            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price">

            <hr>
            <input type="submit" class="registerbtn" value="Create Listing">
        </form>
    </div>
</section>`;

export async function createPage(ctx) {
    console.log('createPage');

    ctx.render(createTemplate(submit));

    async function submit(ev) {
        ev.preventDefault();

        let form = new FormData(ev.target);

        let brand = form.get('brand');
        let model = form.get('model');
        let description = form.get('description');
        let year = Number(form.get('year'));
        let imageUrl = form.get('imageUrl');
        let price = Number(form.get('price'));

        try {

            if (!brand || !model || !description || !year || !imageUrl || !price) {
                throw new Error('All fields are required!')
            } else if (year < 0 || price < 0) {
                throw new Error('Year and price must be a positive numbers!')
            }

            let body = {
                brand,
                model,
                description,
                year,
                imageUrl,
                price
            }

            await createItem( body);
            ev.target.reset();
            ctx.page.redirect('/catalog');

        } catch (err) {
            alert(err.message);
        }
    }

}