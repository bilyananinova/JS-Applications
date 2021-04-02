import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllItems, getAllUsers, deleteItem } from '../api/data.js';

let meTemplate = (articles, followers, onDelete) => html`
<section id="viewMe">
    <div class="content">
        <div class="chirper">

            <h2 class="titlebar">${sessionStorage.getItem('email')}</h2>

            <form id="formSubmitChirpMy" class="chirp-form">
                <textarea name="text" class="chirp-input"></textarea>
                <input class="chirp-submit" id="btnSubmitChirpMy" value="Chirp" type="submit">
            </form>

            <div id="myStats" class="user-details">
                <span>${articles.length} chirps</span> | <span>0 following</span> | <span>${followers} followers</span>
            </div>
        </div>
        <div id="myChirps" class="chirps">
            <h2 class="titlebar">Chirps</h2>
            ${articles.length > 0 
            ? html `
            ${articles.map(article => articleTemplate(article, onDelete))}`
            : html `
            <div class="chirp"><span class="loading">No chirps in database</span></div>`}
        </div>
    </div>
</section>`;

let articleTemplate = (article, onDelete) => html`
<article class="chirp">
    <div class="titlebar">
        <a href="/me" class="chirp-author">${article.author}</a>
        <a @click=${() => onDelete(article._id)} href="javascript:void(0)"><span class="chirp-time">Delete</span></a>
    </div>
    <p>${article.text}</p>
</article>`;

export async function mePage(ctx) {
    
    let chirps = await getAllItems();
    let mychirps = Object.values(chirps).filter(c => c.author == sessionStorage.getItem('email'));
    
    let allusers = await getAllUsers();
    let currentUser = Object.values(allusers).filter( u => u.username == sessionStorage.getItem('email'))[0];
    let followers = currentUser.subscriptions.length;
    
    async function onDelete(id) {
        debugger
        await deleteItem(id);
        ctx.page.redirect('/me');
    }
    
    ctx.render(meTemplate(mychirps,followers, onDelete));

}