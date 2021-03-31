import { html } from '../../node_modules/lit-html/lit-html.js';
import { until } from '../../node_modules/lit-html/directives/until.js';
import { loading } from '../loading.js';
import { getTeamById, updateItem } from '../api/data.js';

let editTemplate = (team, submit) => html`
<section id="edit">
    <article class="narrow">
        <header class="pad-med">
            <h1>Edit Team</h1>
        </header>
        <form @submit=${submit} id="edit-form" class="main-form pad-large">
            <!-- <div class="error">Error message.</div> -->
            <label>Team name: <input type="text" name="name" .value=${team.name}></label>
            <label>Logo URL: <input type="text" name="logoUrl" .value=${team.logoUrl}></label>
            <label>Description: <textarea name="description" .value=${team.description}></textarea></label>
            <input class="action cta" type="submit" value="Save Changes">
        </form>
    </article>
</section>`;

export async function editPage(ctx) {
    let teamId = ctx.params.id
    ctx.render(until(populate(teamId), loading()));

    async function populate(teamId) {
        let team = await getTeamById(teamId);
        return editTemplate(team, submit);
    }

    async function submit(ev) {
        ev.preventDefault();
        let form = new FormData(ev.target);

        let name = form.get('name');
        let logoUrl = form.get('logoUrl');
        let description = form.get('description');

        if (!name || !logoUrl || !description) {
            return;
        }

        await updateItem(ctx.params.id, { name, logoUrl, description });
        ctx.page.redirect('/details/' + ctx.params.id);
    }



}