import { html } from '../../node_modules/lit-html/lit-html.js';
import { getItemById, deleteItem, postLike, getAllLikesForMovie, getAllLikesByUser} from '../api/data.js';
import { errorBox, successBox} from '../notification.js';

let detailsTemplate = (movie, userId, ownerId, onDelete, likeMovie, likes, likedByUser ) => html`
<div class="container">
    <div class="row bg-light text-dark">
        <h1>Movie title: ${movie.title}</h1>

        <div class="col-md-8">
            <img class="img-thumbnail" src="${movie.img}" alt="Movie">
        </div>
        <div class="col-md-4 text-center">
            <h3 class="my-3 ">Movie Description</h3>
            <p>${movie.description}</p>
            ${userId == ownerId 
            ? html `
                <a @click=${onDelete} class="btn btn-danger" href="javascript:void(0)">Delete</a>
                <a class="btn btn-warning" href="/edit/${movie._id}">Edit</a>
            ` : html `
                ${likedByUser.length == 0 
                    ? html `<a @click=${likeMovie} class="btn btn-primary" href="javascript:void(0)">Like</a>` 
                    : html `<span class="enrolled-span">Liked ${likes++}</span>`}
            `}
        </div>
    </div>
</div>`;


export async function detailsPage(ctx) {

    let id = ctx.params.id;
    let movie = await getItemById(id);

    let userId = sessionStorage.getItem('userId');
    let ownerId = movie._ownerId;

    let likes = await getAllLikesForMovie(id);
    let likedByUser = await getAllLikesByUser(id, sessionStorage.getItem('userId'));

    ctx.render(detailsTemplate(movie, userId, ownerId, onDelete, likeMovie, likes, likedByUser));


    async function onDelete() {
        let confirmation = confirm('Are you sure you want to delete this movie?');

        if(confirmation) {

            try{
                await deleteItem(id);
                successBox('Deleted successfully');
                ctx.page.redirect('/');
            } catch(err) {
                errorBox(err.message);
            }
        }
    }

    async function likeMovie() {
        
        try{
            await postLike({movieId: id});
            successBox('Liked successfully');
            ctx.page.redirect('/details/'+ id);
        } catch(err) {
            errorBox(err.message);
        }

    }
}