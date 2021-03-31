import { html } from '../../node_modules/lit-html/lit-html.js'
import { createItem } from '../api/data.js';

let createTemplate = (submit, msg) => html`
<section id="create">
    <article class="narrow">
        <header class="pad-med">
            <h1>New Team</h1>
        </header>
        <form @submit=${submit} id="create-form" class="main-form pad-large">
            ${msg 
                ? html `
            <div class="error">${msg}</div>`
                : ''}
            <label>Team name: <input type="text" name="name"></label>
            <label>Logo URL: <input type="text" name="logoUrl"></label>
            <label>Description: <textarea name="description"></textarea></label>
            <input class="action cta" type="submit" value="Create Team">
        </form>
    </article>
</section>`;

export async function createPage(ctx) {
    ctx.render(createTemplate(submit));

    async function submit(ev) {
        ev.preventDefault();
        let form = new FormData(ev.target);

        let name = form.get('name');
        let logoUrl = form.get('logoUrl');
        let description = form.get('description');

        try {

            if (!name || !logoUrl || !description) {
                throw new Error ('All fields are required');
            } else if (name.length < 4) {
                throw new Error ('Name must be at least 4 characters');
            } else if (description.length < 10) {
                throw new Error ('Name must be at least 10 characters');
            }

            let newly = await createItem({ name, logoUrl, description });
            ev.target.reset();
            ctx.page.redirect(`/details/${newly._id}`);
        } catch (err) {
            ctx.render(createTemplate(submit, msg));
        }
    }

}