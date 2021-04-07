import { html } from '../../node_modules/lit-html/lit-html.js';
import { createItem } from '../api/data.js';

let createTemplate = (onSubmit) => html`
<section id="create-page" class="content">
    <h1>Create Article</h1>

    <form @submit=${onSubmit} id="create" action="#" method="">
        <fieldset>
            <p class="field title">
                <label for="create-title">Title:</label>
                <input type="text" id="create-title" name="title" placeholder="Enter article title">
            </p>

            <p class="field category">
                <label for="create-category">Category:</label>
                <input type="text" id="create-category" name="category" placeholder="Enter article category">
            </p>
            <p class="field">
                <label for="create-content">Content:</label>
                <textarea name="content" id="create-content"></textarea>
            </p>

            <p class="field submit">
                <input class="btn submit" type="submit" value="Create">
            </p>

        </fieldset>
    </form>
</section>`;

export async function createPage(ctx) {
    // console.log('createPage');

    ctx.render(createTemplate(onSubmit));

    async function onSubmit(ev) {
        ev.preventDefault();

        let form = new FormData(ev.target);

        let title = form.get('title');
        let category = form.get('category');
        let content = form.get('content');

        try {

            if (!title || !content || !category) {
                throw new Error('All fields are require!');
            }

            let body = {
                title,
                category,
                content
            }

            await createItem(body);
            ctx.page.redirect('/');

        } catch (err) {
            alert(err.message);
        }
    }
}