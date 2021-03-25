import { html } from '../../node_modules/lit-html/lit-html.js';
import { createItem } from '../api/data.js';

let addTemplate = (submit, msg) => html`
${msg ? html`${notificationError(msg)}` : ''}
<form @submit=${submit} class="text-center border border-light p-5" action="#" method="">
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

let notificationError = (msg) => html`
<section class="notifications">
    <p class="notification-message" id="errorBox">${msg}</p>
</section>`;

let notificationSuccess = (msg) => html`
<section class="notifications successBox" style="background-color:rgba(1, 131, 29, 0.541);">
    <p class="notification-message" id="successBox">${msg}</p>
</section>`;

export async function addPage(ctx) {
    console.log('addmovie');

    async function submit(ev) {
        ev.preventDefault();
        let formData = new FormData(ev.target);

        let title = formData.get('title');
        let description = formData.get('description');
        let img = formData.get('img');

        if (title != '' || description != '' || img != '') {
            let body = { title, description, img };
            await createItem(body);
            ctx.render(notificationSuccess('Created successfully!'));
            setTimeout(() => {
                ctx.page.redirect('/');
            }, 1000)
        } else {
            ctx.render(addTemplate(submit, 'Invalid inputs!'));
        }

    }
    ctx.render(addTemplate(submit));
}