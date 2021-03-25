import { html } from '../../node_modules/lit-html/lit-html.js';
import { getItemById, updateItem } from '../api/data.js';


let editTemplate = (article, submit) => html`
<div class="container">
    <form @submit=${submit}>
        <fieldset>
            <legend>Edit article</legend>
            <p class="field title">
                <input type="text" name="title" id="title" placeholder="Arrays" .value="${article.title}">
                <label for="title">Title:</label>
            </p>
            <p class="field category">
                <input type="text" name="category" id="category" placeholder="JavaScript" .value="${article.category}">
                <label for="category">Category:</label>
            </p>
            <p class="field content">
                <textarea name="content" id="content" .value="${article.content}"></textarea>
                <label for="content">Content:</label>
            </p>
            <p class="field submit">
                <button class="btn submit" type="submit">Edit</button>
            </p>
        </fieldset>
    </form>
</div>`;


export async function editPage(ctx) {
    console.log('edit');
    let id = ctx.params.id;
    let article = await getItemById(id);
    ctx.render(editTemplate(article, submit));

    async function submit(ev) {
        ev.preventDefault();
        let formData = new FormData(ev.target);

        let title = formData.get('title');
        let category = formData.get('category');
        let content = formData.get('content');

        let data = {
            title, category, content
        }

        await updateItem(id, data);
        ctx.page.redirect('/');
    }

}
