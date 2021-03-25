import { html } from '../../node_modules/lit-html/lit-html.js';
import { getItems } from '../api/data.js';

let homeTemplate = (movies, searchParams, search) => html`
<div class="jumbotron jumbotron-fluid text-light" style="background-color: #343a40;">
    <img src="https://s.studiobinder.com/wp-content/uploads/2019/06/Best-M-Night-Shyamalan-Movies-and-Directing-Style-StudioBinder.jpg"
        class="img-fluid" alt="Responsive image">
    <h1 class="display-4">Movies</h1>
    <p class="lead">Unlimited movies, TV shows, and more. Watch anywhere. Cancel anytime.</p>
</div>

${sessionStorage.getItem('token') !== null ? html`
<h1 class="text-center">Movies</h1>
<section>
    <a href="/addmovie" class="btn btn-warning ">Add Movie</a>
    <form @submit=${search} class="search float-right">
        <label>Search: </label>
        <input type="text" name="search" value=${searchParams ? searchParams : ''}>
        <input type="submit" class="btn btn-info" value="Search">
    </form>
</section>
<div class="mt-3">
    <div class="row d-flex d-wrap">
        <div class="card-deck d-flex justify-content-center">
            ${movies.length > 0 ? html`${movies.map(movie => movieCard(movie))}` : html`<p>No movies...</p>`}
        </div>
    </div>
</div>` : ''}`;

let movieCard = (movie) => html`
<div class="card mb-4">
    <img class="card-img-top" src="${movie.img}" alt="Card image cap" width="400">
    <div class="card-body">
        <h4 class="card-title">${movie.title}</h4>
    </div>
    <div class="card-footer">
        <a href="/details/${movie._id}"><button type="button" class="btn btn-info">Details</button></a>
    </div>
</div>`;

export async function homePage(ctx) {
    console.log('home');

    let searchParams = ctx.querystring.split('=')[1];
    let movies = await getItems(searchParams);
    ctx.setUserNav();
    ctx.render(homeTemplate(movies, searchParams, search));

    async function search(ev) {
        ev.preventDefault();
        let formData = new FormData(ev.target);
        let input = encodeURIComponent(formData.get('search').trim());
        ctx.page.redirect(`/?search=${input}`);
    }

}