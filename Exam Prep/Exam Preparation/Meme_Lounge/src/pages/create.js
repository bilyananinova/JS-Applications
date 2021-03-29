import { html } from '../../node_modules/lit-html/lit-html.js';
import { createItem } from '../api/data.js';
import { notify } from '../notifications.js';

let createTemplate = (submit) => html`
<!-- Create Meme Page ( Only for logged users ) -->
<section id="create-meme">
    <form @submit=${submit} id="create-form">
        <div class="container">
            <h1>Create Meme</h1>
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title">
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description"></textarea>
            <label for="imageUrl">Meme Image</label>
            <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
            <input type="submit" class="registerbtn button" value="Create Meme">
        </div>
    </form>
</section>`;

export async function createPage(ctx) {
    console.log('createPage');

    ctx.render(createTemplate(submit));

    async function submit(ev) {
        ev.preventDefault();

        let form = new FormData(ev.target);
        let title = form.get('title');
        let description = form.get('description');
        let imageUrl = form.get('imageUrl');

        console.log(title);
        console.log(description);
        console.log(imageUrl);

        try {
            if (!title || !description || !imageUrl) {
                throw new Error('All field are require!')
            }

            await createItem({title, description, imageUrl});
            ctx.page.redirect('/catalog');

        } catch (err) {
            notify(err.message)
        }
    }

}