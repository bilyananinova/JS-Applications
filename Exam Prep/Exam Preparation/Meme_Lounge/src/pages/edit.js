import { html } from '../../node_modules/lit-html/lit-html.js';
import { getItemById, updateItem } from '../api/data.js';
import { notify } from '../notifications.js';

let editTemplate = (meme, submit) => html`
<!-- Edit Meme Page ( Only for logged user and creator to this meme )-->
<section id="edit-meme">
    <form @submit=${submit} id="edit-form">
        <h1>Edit Meme</h1>
        <div class="container">
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title" .value=${meme.title}>
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description"
                .value=${meme.description}> </textarea>
            <label for="imageUrl">Image Url</label>
            <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" .value=${meme.imageUrl}>
            <input type="submit" class="registerbtn button" value="Edit Meme">
        </div>
    </form>
</section>`;

export async function editPage(ctx) {
    console.log('editPage');
    console.log(ctx.params.id);

    let meme = await getItemById(ctx.params.id)
    ctx.render(editTemplate(meme, submit));

    async function submit(ev) {
        ev.preventDefault();

        let form = new FormData(ev.target);

        let title = form.get('title');
        let description = form.get('description');
        let imageUrl = form.get('imageUrl');

        try {
            if (!title || !description || !imageUrl) {
                throw new Error('All fields are required!')
            }

            await updateItem(ctx.params.id, { title, description, imageUrl });
            ctx.page.redirect('/details/' + ctx.params.id);

        } catch (err) {
            notify(err.message)
        }
    }

}