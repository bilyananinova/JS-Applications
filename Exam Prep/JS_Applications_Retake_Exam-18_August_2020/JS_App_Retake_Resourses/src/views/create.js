import { html } from '../../node_modules/lit-html/lit-html.js';
import { createItem } from '../api/data.js';

let createTemplate = (submit) => html`
<h1>Create New Offer</h1>
<p class="message"></p>
<form @submit=${submit}>
    <div>
        <input type="text" placeholder="Name..." name="name">
    </div>
    <div>
        <input type="text" placeholder="Price..." name="price">
    </div>
    <div>
        <input type="text" placeholder="Image url..." name="img">
    </div>
    <div>
        <textarea placeholder="Give us some description about this offer..." name="description"></textarea>
    </div>
    <div>
        <input type="text" placeholder="Brand..." name="brand">
    </div>
    <div>
        <button>Create</button>
    </div>
</form>`;


export async function createPage(ctx) {
    console.log('create');

    async function submit(ev) {
        ev.preventDefault();

        let form = new FormData(ev.target);

        let name = form.get('name');
        let price = form.get('price');
        let img = form.get('img');
        let description = form.get('description');
        let brand = form.get('brand');

        if (!name || !price || !img || !description || !brand) {
            throw new Error('All fields are required!')
        }

        let body = {
            name,
            price,
            img,
            description,
            brand,
            creator_id: sessionStorage.getItem('ownerId'),
            bought: []
        }

        await createItem(body);
        ev.target.reset();
        ctx.page.redirect('/');
    }

    ctx.render(createTemplate(submit))
}