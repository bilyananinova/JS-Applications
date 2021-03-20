import { html } from '../../node_modules/lit-html/lit-html.js';
import { getItemById, deleteItem } from '../api/data.js'

let detailsTemplate = (item, delItem) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Furniture Details</h1>
    </div>
</div>
<div class="row space-top">
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src="${item.img}" />
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <p>Make: <span>${item.make}</span></p>
        <p>Model: <span>${item.model}</span></p>
        <p>Year: <span>${item.year}</span></p>
        <p>Description: <span>${item.description}</span></p>
        <p>Price: <span>${item.price}</span></p>
        <p>Material: <span>${item.material}</span></p>
        <div>
            <a href="/edit/${item._id}" class="btn btn-info">Edit</a>
            <a @click=${delItem} href="javascript:void(0)" class="btn btn-red">Delete</a>
        </div>
    </div>
</div>`;



export async function detailsPage(ctx) {
    // console.log('detailsPage');
    // console.log(ctx);
    // console.log(ctx.params.id);
    let item = await getItemById(ctx.params.id);
    ctx.render(detailsTemplate(item, delItem));

    async function delItem() {
        let confirmation = confirm('Are you sure you want to delete this item?');
        if (confirmation) {
            await deleteItem(ctx.params.id);
            ctx.page.redirect('/')
        }
    }
}