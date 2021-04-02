import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllItems, getAllUsers, createItem } from '../api/data.js';

let homeTemplate = (articles,followedAuthors, followers, onSubmit) => html`
<section id="viewFeed">
    <div class="content">
        <div class="chirper">

            <h2 class="titlebar">${sessionStorage.getItem('email')}</h2>

            <form @submit=${onSubmit} id="formSubmitChirp" class="chirp-form">
                <textarea name="text" class="chirp-input"></textarea>
                <input class="chirp-submit" id="btnSubmitChirp" value="Chirp" type="submit">
            </form>

            <div id="userStats" class="user-details">
                <span>${articles.length} chirps</span> | <span>${followedAuthors.length} following</span> | <span>${followers} followers</span>
            </div>
        </div>
        <div id="chirps" class="chirps">
            <h2 class="titlebar">Chirps</h2>

            ${articles.length > 0 
            ? html `
            ${articles.map(article => articleTemplate(article))}`
            : html `
            <div class="chirp"><span class="loading">No chirps in database</span></div>`}

        </div>
    </div>
</section>`;

let articleTemplate = (article) => html`
<article class="chirp">
    <div class="titlebar">
        <a href="/profile/${article.author}" class="chirp-author">${article.author}</a>
        <span class="chirp-time">1 day</span>
    </div>
    <p>${article.text}</p>
</article>`;

export async function homePage(ctx) {

    ctx.setUserNav();
    let chirps = await getAllItems();
    let allusers = await getAllUsers();
    
    let currentUser = Object.values(allusers).filter( u => u.username == sessionStorage.getItem('email'))[0]
    let followers = currentUser.subscriptions.length;
    
    let followedAuthors = [];
    let followedAuthorsChirps = [];
    let users = Object.values(await getAllUsers()).filter(u => u.subscriptions.includes(sessionStorage.getItem('email')));
    users.forEach(element => {
        followedAuthors.push(element.username)
    });
    followedAuthors.forEach(a => {
        followedAuthorsChirps = Object.values(chirps).filter(c => c.author == a)
    });

    ctx.render(homeTemplate(followedAuthorsChirps,followedAuthors,followers, onSubmit));

    async function onSubmit(ev) {
        ev.preventDefault();
        let form = new FormData(ev.target);
        let text = form.get('text');

        let body = {
            text,
            creator: sessionStorage.getItem('userId'),
            author: sessionStorage.getItem('email'),
        }

        await createItem(body);
        ctx.page.redirect('/me')

    }
}