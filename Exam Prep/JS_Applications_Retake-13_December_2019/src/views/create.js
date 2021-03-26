import { html } from '../../node_modules/lit-html/lit-html.js';
import {createItem } from '../api/data.js';

let createTemplate = (submit) => html`
<div class="container home wrapper  my-md-5 pl-md-5">
    <div class=" d-md-flex flex-mb-equal ">
        <div class="col-md-6">
            <img class="responsive-ideas create" src="/images/creativity_painted_face.jpg" alt="">
        </div>
        <form @submit=${submit} class="form-idea col-md-5" action="">
            <div class="text-center mb-4">
                <h1 class="h3 mb-3 font-weight-normal">Share Your Idea</h1>
            </div>
            <div class="form-label-group">
                <label for="ideaTitle">Title</label>
                <input type="text" id="title" name="title" class="form-control" placeholder="What is your idea?"
                    required="" autofocus="">
            </div>
            <div class="form-label-group">
                <label for="ideaDescription">Description</label>
                <textarea type="text" name="description" class="form-control" placeholder="Description"
                    required=""></textarea>
            </div>
            <div class="form-label-group">
                <label for="inputURL">Add Image</label>
                <input type="text" id="imageURl" name="imageURL" class="form-control" placeholder="Image URL"
                    required="">

            </div>
            <button class="btn btn-lg btn-dark btn-block" type="submit">Create</button>

            <p class="mt-5 mb-3 text-muted text-center">© SoftTerest - 2019.</p>
        </form>
    </div>
</div>`;


export async function createPage(ctx) {
    console.log('create');

    async function submit(ev) {
        ev.preventDefault();

        let form = new FormData(ev.target);

        let title = form.get('title');
        let description = form.get('description');
        let imageURL = form.get('imageURL');

        if (title.length <= 6) {
            'The title should be at least 6 characters long.'
        } else if (description.length < 10) {
            'The description should be at least 10 characters long.'
        }

        let body = {
            title,
            description,
            imageURL,
            _ownerId: sessionStorage.getItem('ownerId'),
            likes: 0,
            comments: []
        }
        await createItem(body);
        ev.target.reset();
        ctx.page.redirect('/dashboard');
    }

    ctx.render(createTemplate(submit))
}