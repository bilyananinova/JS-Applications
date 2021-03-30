import { html } from '../../node_modules/lit-html/lit-html.js';
import { getItemById, updateItem } from '../api/data.js';

let editTemplate = (car, submit) => html`
<section id="edit-listing">
    <div class="container">

        <form @submit=${submit} id="edit-form">
            <h1>Edit Car Listing</h1>
            <p>Please fill in this form to edit an listing.</p>
            <hr>

            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand" .value=${car.brand}>

            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model" .value=${car.model}>

            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description" .value=${car.description}>

            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year" .value=${car.year}>

            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl" .value=${car.imageUrl}>

            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price" .value=${car.price}>

            <hr>
            <input type="submit" class="registerbtn" value="Edit Listing">
        </form>
    </div>
</section>`;


export async function editPage(ctx) {
    console.log('editPage', ctx.params.id);
    let car = await getItemById(ctx.params.id);
    ctx.render(editTemplate(car, submit));

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

            await updateItem(ctx.params.id, body);
            ev.target.reset();
            ctx.page.redirect('/details/' + ctx.params.id);

        } catch (err) {
            alert(err.message);
        }
    }
}