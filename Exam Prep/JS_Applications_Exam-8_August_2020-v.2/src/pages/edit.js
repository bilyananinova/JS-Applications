import { html } from '../../node_modules/lit-html/lit-html.js';
import { getItemById, updateItem } from '../api/data.js';
import { errorBox, successBox} from '../notification.js';

let editTemplate = (movie, onSubmit) => html`
<form @submit=${onSubmit} class="text-center border border-light p-5" action="#" method="">
    <h1>Edit Movie</h1>
    <div class="form-group">
        <label for="title">Movie Title</label>
        <input type="text" class="form-control" placeholder="Movie Title" value="" name="title" .value=${movie.title}>
    </div>
    <div class="form-group">
        <label for="description">Movie Description</label>
        <textarea class="form-control" placeholder="Movie Description..." name="description" .value=${movie.description}></textarea>
    </div>
    <div class="form-group">
        <label for="imageUrl">Image url</label>
        <input type="text" class="form-control" placeholder="Image Url" value="" name="img" .value=${movie.img}>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
</form>`;


export async function editPage(ctx) {
    // console.log('editPage');
    // console.log(ctx.params.id);
    let id = ctx.params.id;
    let movie = await getItemById(id);
    ctx.render(editTemplate(movie, onSubmit));

    async function onSubmit (ev) {
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

            await updateItem(id, body);
            ev.target.reset();
            successBox('Eddited successfully');
            ctx.page.redirect('/details/' + id)
        } catch (err) {
            errorBox(err.message)
        }
    }

}