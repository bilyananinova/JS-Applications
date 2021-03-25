import { html } from '../../node_modules/lit-html/lit-html.js';
import { getItemById,  deleteItem, getLike, getLikeByUserId, postLikes} from '../api/data.js';

let detailsTemplate = (movie, deleteMovie, likeMovie, likes, dataUser) => html`
<div class="container">
    <div class="row bg-light text-dark">
        <h1>Movie title: ${movie.title}</h1>
        <div class="col-md-8">
            <img class="img-thumbnail" src="${movie.img}" alt="Movie">
        </div>
        <div class="col-md-4 text-center">
            <h3 class="my-3 ">Movie Description</h3>
            <p>${movie.description}</p>
            ${movie._ownerId == sessionStorage.getItem('ownerId') 
            ? html`<a @click=${deleteMovie} class="btn btn-danger" href="javascript:void(0)">Delete</a>
                   <a class="btn btn-warning" href="/edit/${movie._id}">Edit</a>`                   
            : ''}               
            ${dataUser.length > 0 ? 
                html `
                <span class="enrolled-span">Liked ${likes}</span>
                ` : html `<a @click=${likeMovie} class="btn btn-primary" href="javascript:void(0)">Like</a>`}
        </div>
    </div>
</div>`;

let notificationSuccess = (msg) => html`
<section class="notifications successBox" style="background-color:rgba(1, 131, 29, 0.541);">
    <p class="notification-message" id="successBox">${msg}</p>
</section>`;

let likes = 0;
let dataUser = [];
export async function detailsPage(ctx) {
    console.log('details');
    console.log(ctx.params.id);
    let user = sessionStorage.getItem('ownerId');
    let id = ctx.params.id;
    let movie = await getItemById(ctx.params.id);
    ctx.render(detailsTemplate(movie,deleteMovie, likeMovie, likes, dataUser));

    async function deleteMovie() {
        let confirmation = confirm('Are you sure you want to delete this movie?');

        if (confirmation) {
            let response = await deleteItem(ctx.params.id);
            if(response.ok) {
                ctx.render(notificationSuccess('Deleted successfully'));
                setTimeout(() => {
                    ctx.page.redirect('/');
                }, 1000);
            }
        }
    }

    async function likeMovie(ev) {
        ev.preventDefault()
        let body = {movieId: id};

        await postLikes(body);
        let dataLike = await getLike(id);
        dataUser = await getLikeByUserId(id, user);

        if(dataLike.ok) {
            likes++
        }

        if(dataUser) {
            ctx.render(detailsTemplate(movie,deleteMovie, likeMovie, likes, dataUser));
        }        
    }

    if(movie._ownerId == sessionStorage.getItem('ownerId')) {
        document.querySelector('.btn-primary').style.display = "none"
    }   
    
}