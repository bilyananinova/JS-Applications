import { html } from '../../node_modules/lit-html/lit-html.js'
import { getAllItems, getAllMembers} from '../api/data.js';

let browseTemplate = (token, teams, counter) => html`
<section id="browse">

    <article class="pad-med">
        <h1>Team Browser</h1>
    </article>

    ${token != null ? 
        html `
        <article class="layout narrow">
            <div class="pad-small"><a href="/create" class="action cta">Create Team</a></div>
        </article>` : ''}

    ${teams.map(team => teamTemplate(team, counter))}

</section>`;

let teamTemplate = (team, counter) => html`
<article class="layout">
    <img src="${team.logoUrl}" class="team-logo left-col">
    <div class="tm-preview">
        <h2>${team.name}</h2>
        <p>${team.description}</p>
        <span class="details">${counter(team._id)} Members</span>
        <div><a href="/details/${team._id}" class="action">See details</a></div>
    </div>
</article>`;

export async function browsePage(ctx) {
    let token = sessionStorage.getItem('token');
    let teams = await getAllItems();
    let members = await getAllMembers();
    ctx.render(browseTemplate(token, teams, counter))

    function counter(teamId) {
        let result = members.filter(m=> m.teamId == teamId);
        return result.length;
    }
}