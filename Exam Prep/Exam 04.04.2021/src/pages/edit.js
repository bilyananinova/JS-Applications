import { html } from '../../node_modules/lit-html/lit-html.js';
import { getItemById, updateItem } from '../api/data.js';

let editTemplate = (article, onSubmit) => html`
<section id="edit-page" class="content">
    <h1>Edit Article</h1>

    <form @submit=${onSubmit} id="edit" action="#" method="">
        <fieldset>
            <p class="field title">
                <label for="title">Title:</label>
                <input type="text" name="title" id="title" placeholder="Enter article title" .value=${article.title}>
            </p>

            <p class="field category">
                <label for="category">Category:</label>
                <input type="text" name="category" id="category" placeholder="Enter article category"
                    .value=${article.category}>
            </p>
            <p class="field">
                <label for="content">Content:</label>
                <textarea name="content" id="content" .value=${article.content}></textarea>
            </p>

            <p class="field submit">
                <input class="btn submit" type="submit" value="Save Changes">
            </p>

        </fieldset>
    </form>
</section>`;


export async function editPage(ctx) {
    // console.log('editPage');
    // console.log(ctx.params.id);
    let id = ctx.params.id;
    let article = await getItemById(id);
    ctx.render(editTemplate(article, onSubmit));

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
            };

            await updateItem(id, body);
            ctx.page.redirect('/details/' + id);

        } catch (err) {
            alert(err.message);
        }
    }
}