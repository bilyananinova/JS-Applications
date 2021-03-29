import { html } from '../../node_modules/lit-html/lit-html.js';
import { deleteItem, getItemById } from '../api/data.js';

let detailsTemplate = (meme, ownerId, userId, deleteMeme) => html`
<!-- Details Meme Page (for guests and logged users) -->
<section id="meme-details">
    <h1>Meme Title: ${meme.title}</h1>
    <div class="meme-details">
        <div class="meme-img">
            <img alt="meme-alt" src="${meme.imageUrl}">
        </div>
        <div class="meme-description">
            <h2>Meme Description</h2>
            <p>
                ${meme.description}
            </p>

            ${ownerId == userId 
                ? html`
            <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
            <a class="button warning" href="/edit/${meme._id}">Edit</a>
            <button @click=${deleteMeme} class="button danger">Delete</button>` 
                : ''}

        </div>
    </div>
</section>`;

export async function detailsPage(ctx) {
    console.log('detailsPage', ctx.params.id);
    let meme = await getItemById(ctx.params.id);
    let ownerId = meme._ownerId;
    let userId = sessionStorage.getItem('userId');

    ctx.render(detailsTemplate(meme, ownerId, userId, deleteMeme));

    async function deleteMeme() {
        let confirmation = confirm('Are you sure you want to delete this meme?');

        if(confirmation) {
            await deleteItem(meme._id);
            ctx.page.redirect('/catalog')
        }
    }
}