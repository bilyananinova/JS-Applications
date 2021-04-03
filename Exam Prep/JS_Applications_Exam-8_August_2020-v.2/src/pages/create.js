import { html } from '../../node_modules/lit-html/lit-html.js';
import { createItem } from '../api/data.js';
import { errorBox, successBox} from '../notification.js';

let createTemplate = (onSubmit) => html`

<form @submit=${onSubmit} class="text-center border border-light p-5" action="#" method="">
    <h1>Add Movie</h1>
    <div class="form-group">
        <label for="title">Movie Title</label>
        <input type="text" class="form-control" placeholder="Title" name="title" value="">
    </div>
    <div class="form-group">
        <label for="description">Movie Description</label>
        <textarea class="form-control" placeholder="Description" name="description"></textarea>
    </div>
    <div class="form-group">
        <label for="imageUrl">Image url</label>
        <input type="text" class="form-control" placeholder="Image Url" name="img" value="">
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
</form>`;

export async function createPage(ctx) {

    ctx.render(createTemplate(onSubmit));

    async function onSubmit(ev) {
        ev.preventDefault();

        let form = new FormData(ev.target);
        
        let title = form.get('title');
        let description = form.get('description');
        let img = form.get('img');

        try {
            if (!title || !description || ! img) {
                throw new Error('Invalid inputs')
            } 

            let body = {
                title, description, img
            }
            
            await createItem(body);
            ev.target.reset();
            successBox('Created successfully!');
            ctx.page.redirect('/');
        } catch (err) {
            errorBox(err.message);
        }
    }
}