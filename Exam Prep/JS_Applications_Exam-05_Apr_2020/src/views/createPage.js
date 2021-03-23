import { html } from '../../node_modules/lit-html/lit-html.js';
import { createItem } from '../api/data.js';

let createTemplate = (submit) => html`
<div class="container">
    <form @submit=${submit}>
        <fieldset>
            <legend>Create article</legend>
            <p class="field title">
                <input type="text" id="title" name="title" placeholder="Arrays">
                <label for="title">Title:</label>
            </p>

            <p class="field category">
                <input type="text" id="category" name="category" placeholder="JavaScript">
                <label for="category">Category:</label>
            </p>
            <p class="field content">
                <textarea name="content" id="content"></textarea>
                <label for="content">Content:</label>
            </p>

            <p class="field submit">
                <button class="btn submit" type="submit">Create</button>
            </p>

        </fieldset>
    </form>
</div>`;

export async function createPage(ctx) {
    console.log('crate');

    async function submit(ev) {
        ev.preventDefault();

        let formData = new FormData(ev.target);
        let title = formData.get('title');
        let category = formData.get('category');
        let content = formData.get('content');
        let email = sessionStorage.getItem('email');
        let owner = sessionStorage.getItem('ownerId');
        let article = {
            title, category, content, email, owner
        }
        await createItem(article);
        ctx.page.redirect('/');
    }


    ctx.render(createTemplate(submit));
}