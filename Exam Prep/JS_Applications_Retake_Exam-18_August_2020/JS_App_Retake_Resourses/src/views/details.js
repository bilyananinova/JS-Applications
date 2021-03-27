import { html } from '../../node_modules/lit-html/lit-html.js';
import { getItemById, deleteItem, updateItem } from '../api/data.js';


let detailsTemplate = (item, onDelete, buy, isBougth) => html`
<div class="offer-details">
    <h1>${item.title}</h1>
    <div class="info">
        <img src="${item.img}" alt="">
        <div class="description">${item.description}
            <br>
            <br>
            <p class="price">$${item.price}</p>
        </div>
    </div>
    <div class="actions">
    ${sessionStorage.getItem('ownerId') == item.creator_id 
    ? html`
        <a href="/edit/${item._id}">Edit</a>
        <a @click=${onDelete} href="javascript:void(0)">Delete</a>`
    : html `
    ${isBougth 
        ? html `<a @click=${buy}>Buy</a>
    ` : html `<span>You bought it</span>`}`}
    </div>
</div>`;

export async function detailsPage(ctx) {
    console.log('details', ctx.params.id);

    let item = await getItemById(ctx.params.id);
    ctx.render(detailsTemplate(item, onDelete, buy));

    async function onDelete() {
        let confirmation = confirm('Are you sure you want to delete this shoes?');

        if(confirmation) {
            await deleteItem(ctx.params.id)
            ctx.page.redirect('/')
        }
    }

    async function buy() {
        let id = sessionStorage.getItem('ownerId')
        let user = sessionStorage.getItem('email')
        let body = Object.assign({}, item)
        body.bougth.push({user,id})
        let isBougth = body.bougth.find(item => item.id == sessionStorage.getItem('ownerId'))

        if(isBougth) {
            ctx.render(detailsTemplate(item, onDelete, buy, isBougth));
        } else {
            await updateItem(ctx.params.id, body);
            ctx.render(detailsTemplate(item, onDelete, buy, isBougth));
        }

    }

}