import { html } from '../../node_modules/lit-html/lit-html.js';
import { getItemById, updateItem } from '../api/data.js';

let editTemplate = (item, submit) => html`
<h1>Edit Offer</h1>
<p class="message"></p>
<form @submit=${submit}>
    <div>
        <input type="text" placeholder="Name..." name="name" .value=${item.name}>
    </div>
    <div>
        <input type="text" placeholder="Price..." name="price" .value=${item.price}>
    </div>
    <div>
        <input type="text" placeholder="Image url..." name="img" .value=${item.img}>
    </div>
    <div>
        <textarea placeholder="Give us some description about this offer..." name="description"
            .value=${item.description}></textarea>
    </div>
    <div>
        <input type="text" placeholder="Brand..." name="brand" .value=${item.brand}>
    </div>
    <div>
        <button>Edit</button>
    </div>
</form>`;

export async function editPage(ctx) {
    console.log('edit', ctx.params.id);

    let item = await getItemById(ctx.params.id);
    ctx.render(editTemplate(item, submit))

    async function submit(ev) {
        ev.preventDefault();

        let form = new FormData(ev.target);

        let name = form.get('name');
        let price = form.get('price');
        let img = form.get('img');
        let description = form.get('description');
        let brand = form.get('brand');

        let body = { name, price, img, description, brand };

        await updateItem(ctx.params.id, body);
        ctx.page.redirect(`/details/${ctx.params.id}`)
    }

}