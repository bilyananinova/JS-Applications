import { html } from '../../node_modules/lit-html/lit-html.js';
import { getItems } from '../api/data.js';

let dashboardTemplate = (ideas) => html`
<div id="dashboard-holder">
    ${(ideas.length > 0) 
        ? html `${ideas.map(idea => ideaCard(idea))}` 
        : html `<h1>No ideas yet! Be the first one :)</h1>`}
</div>`;

let ideaCard = (idea) => html`
<div class="card overflow-hidden current-card details" style="width: 20rem; height: 18rem;">
    <div class="card-body">
        <p class="card-text">${idea.title}</p>
    </div>
    <img class="card-image" src="${idea.img}" alt="Card image cap">
    <a class="btn" href="/details/${idea._id}">Details</a>
</div>
`;

export async function dashboardPage(ctx) {
    console.log('dashboard');
    ctx.setUserNav()
    let ideas = await getItems();
    ctx.render(dashboardTemplate(Object.values(ideas)))
}