import { html } from '../../node_modules/lit-html/lit-html.js';
import { createItem } from '../api/data.js';
import { notify, loading, success } from '../notification.js';



let createTemplate = (submit) => html`
<section id="createSongView">
    <div class="background-spotify">
        <div class="song-container">
            <h1>Create new song</h1>
            <form @submit=${submit} action="#" method="POST">
                <div class="form-group">
                    <label for="title" class="white-labels">Title</label>
                    <input id="title" type="text" name="title" class="form-control" placeholder="Title">
                </div>
                <div class="form-group">
                    <label for="artist" class="white-labels">Artist</label>
                    <input id="artist" type="text" name="artist" class="form-control" placeholder="Artist">
                </div>
                <div class="form-group">
                    <label for="imageURL" class="white-labels">imageURL</label>
                    <input id="imageURL" type="text" name="imageURL" class="form-control" placeholder="imageURL">
                </div>
                <button type="submit" class="btn btn-primary">Create</button>
            </form>
        </div>
    </div>
</section>`;

export async function createPage(ctx) {
    console.log('create');
    ctx.render(createTemplate(submit));

    async function submit(ev) {
        ev.preventDefault();
        let form = new FormData(ev.target);

        let title = form.get('title');
        let artist = form.get('artist');
        let img = form.get('imageURL');

        let _ownerId = sessionStorage.getItem('ownerId');
        let body = {
            _ownerId,
            title,
            artist,
            img,
            likes: 0,
            listened: 0,
        }

        try {

            if (!title || !artist || !img) {
               throw new Error('All fields are required!');
            } else if (title.length < 6) {
                throw new Error('The title should be at least 6 characters long');
            } else if (artist.length < 3) {
                throw new Error('The artist should be at least 3 characters long');
            }
            await createItem(body);
            loading();
            setTimeout(() => {
                success('Song created successfully.')
                ctx.page.redirect('/catalog');
                ctx.setUserNav();
            }, 1000);
        } catch(err) {
            notify(err.message);
        }
    }
}