import { html } from '../../node_modules/lit-html/lit-html.js';
import { deleteItem, getItemById } from '../api/data.js';

let detailsTemplate = (article, deleteArticle, userId, ownerId) => html`
<div class="container details">
    <div class="details-content">
        <h2>${article.title}</h2>
        <strong>${article.category}</strong>
        <p>${article.content}</p>
        <div class="buttons">
            ${userId == ownerId ? html`
            <a @click=${deleteArticle} href="javascript:void(0)" class="btn delete">Delete</a>
            <a href="/edit/${article._id}" class="btn edit">Edit</a>` : ''}
            <a href="/" class="btn edit">Back</a>
        </div>
    </div>
</div>`;


export async function detailsPage(ctx) {
    console.log('details');
    let id = ctx.params.id;
    let article = await getItemById(id);

    let userId = sessionStorage.getItem('ownerId')
    let ownerId = article.creator_id
    ctx.render(detailsTemplate(article, deleteArticle, userId, ownerId));

    async function deleteArticle() {
        let confirmation = confirm('Are you sure you want to delete this item?');
        if (confirmation) {
            await deleteItem(id);
            ctx.page.redirect('/');
        }
    }

}
