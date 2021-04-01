import { html } from '../../node_modules/lit-html/lit-html.js';
import { getItemById, deleteItem } from '../api/data.js';

let deletePetsTemplate = () => html`<section class="deletePet">
<h3>Pesho</h3>
<p>Pet counter: <i class="fas fa-heart"></i> 5</p>
<p class="img"><img src="http://pngimg.com/uploads/cat/cat_PNG50491.png"></p>
<form action="#" method="POST">
    <p class="description">This is my cat Pesho</p>
    <button class="button">Delete</button>
</form>
</section>`;



export async function deletePetsPage(ctx) {
    // console.log('detailsPage', ctx.params.id]);
    ctx.render(deletePetsTemplate());

}