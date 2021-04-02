import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllUsers, getAllItems, updateUser } from '../api/data.js';

let profileTemplate = (user, articles, following, onFollow) => html`
<section id="viewProfile">
    <div class="content">
        <div class="chirper">

            <h2 class="titlebar">${user.username}</h2>

            <a @click=${onFollow} id="btnFollow" class="chirp-author" href="javascript:void(0)">
            ${!user.subscriptions.includes(sessionStorage.getItem('email')) ? 'Follow' : 'Unfollow'}
            </a>

            <div id="userProfileStats" class="user-details">
                <span>${articles.length} chirps</span> | <span>${following.length} following</span> | <span>${user.subscriptions.length}
                    followers</span>
            </div>
        </div>
        <div id="profileChirps" class="chirps">
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


export async function prifilePage(ctx) {
    let chirps = await getAllItems();
    let allusers = await getAllUsers();

    let articles = Object.values(chirps).filter( c => c.author == ctx.params.profile)

    let user = Object.values(allusers).filter(u => u.username == ctx.params.profile)[0];
    let following = Object.values(allusers).filter(u => u.subscriptions.includes(ctx.params.profile))

    async function onFollow() {

        if(!user.subscriptions.includes(sessionStorage.getItem('email'))) {
            let body = Object.assign({}, user);
            body.subscriptions.push(sessionStorage.getItem('email'));
            await updateUser(user._id, body);
        } 
        else {
            let body = Object.assign({}, user);
            let index = body.subscriptions.indexOf(sessionStorage.getItem('email'));
            body.subscriptions.splice(index, 1);
            await updateUser(user._id, body);
        }

        ctx.render(profileTemplate(user, articles, following, onFollow));

    }

    ctx.render(profileTemplate(user, articles, following, onFollow));
}