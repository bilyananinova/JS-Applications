import { html } from '../../node_modules/lit-html/lit-html.js';
import { getItemById, deleteItem } from '../api/data.js';

let detailsTemplate = (article, ownerId, userId, onDelete) => html`
<section id="details-page" class="content details">
    <h1>${article.title}</h1>

    <div class="details-content">
        <strong>Published in category ${article.category}</strong>
        <p>${article.content}</p>

        <div class="buttons">
            ${ownerId == userId 
             ? html `
                <a @click=${onDelete} href="javascript:void(0)" class="btn delete">Delete</a>
                <a href="/edit/${article._id}" class="btn edit">Edit</a>`
             : ''}            
            <a href="/" class="btn edit">Back</a>
        </div>
    </div>
</section>`;



export async function detailsPage(ctx) {
    // console.log('detailsPage', ctx.params.id);
    let id = ctx.params.id;
    let article = await getItemById(id);
    let ownerId = article._ownerId;
    let userId = sessionStorage.getItem('userId');
    
    ctx.render(detailsTemplate(article, ownerId, userId, onDelete));

    async function onDelete() {
        let confirmation = confirm('Are you sure you want to delte this article?');

        if(confirmation) {
            await deleteItem(id);
            ctx.page.redirect('/');
        }
    }
}