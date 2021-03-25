import { html } from '../../node_modules/lit-html/lit-html.js';
import { getItemById, updateItem } from '../api/data.js';

let editTemplate = (movie, submit) => html`
<form @submit=${submit} class="text-center border border-light p-5" action="" method="">
    <h1>Edit Movie</h1>
    <div class="form-group">
        <label for="title">Movie Title</label>
        <input type="text" class="form-control" placeholder="Movie Title" .value="${movie.title}" name="title">
    </div>
    <div class="form-group">
        <label for="description">Movie Description</label>
        <textarea class="form-control" placeholder="Movie Description..." .value="${movie.description}"
            name="description"></textarea>
    </div>
    <div class="form-group">
        <label for="imageUrl">Image url</label>
        <input type="text" class="form-control" placeholder="Image Url" .value="${movie.img}" name="img">
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
</form>`;

let notificationSuccess = (msg) => html`
<section class="notifications successBox" style="background-color:rgba(1, 131, 29, 0.541);">
    <p class="notification-message" id="successBox">${msg}</p>
</section>`;

export async function editPage(ctx) {
    console.log('edit');
    let movie = await getItemById(ctx.params.id);

    async function submit(ev) {
        ev.preventDefault();
        let formData = new FormData(ev.target);
        let title = formData.get('title');
        let description = formData.get('description');
        let img = formData.get('img');

        let body = { title, description, img };

        await updateItem(ctx.params.id, body);
        ctx.render(notificationSuccess('Eddited successfully'));
        setTimeout(() => {
            ctx.page.redirect('/details/' + ctx.params.id);
        }, 1000);
    }
    ctx.render(editTemplate(movie, submit));
}