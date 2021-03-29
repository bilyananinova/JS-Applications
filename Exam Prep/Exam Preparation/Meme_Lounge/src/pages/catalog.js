import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllItems } from '../api/data.js';

let catalogTemplate = (allmemes) => html`
<!-- All Memes Page ( for Guests and Users )-->
<section id="meme-feed">
    <h1>All Memes</h1>
    <div id="memes">
        
        ${allmemes.length > 0 
        ? html `
        <!-- Display : All memes in database ( If any ) -->
            ${allmemes.map(meme => memeTeplate(meme))}`
        : html `
        <!-- Display : If there are no memes in database -->
        <p class="no-memes">No memes in database.</p>`}
        
    </div>
</section>`;

let memeTeplate = (meme) => html`
<div class="meme">
    <div class="card">
        <div class="info">
            <p class="meme-title">${meme.title}</p>
            <img class="meme-image" alt="meme-img" src="${meme.imageUrl}">
        </div>
        <div id="data-buttons">
            <a class="button" href="/details/${meme._id}">Details</a>
        </div>
    </div>
</div>`;

export async function catalogPage(ctx) {
    console.log('catalogPage');
    let allmemes = await getAllItems();
    ctx.render(catalogTemplate(allmemes))
}