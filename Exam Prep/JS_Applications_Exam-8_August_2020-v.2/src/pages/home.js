import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllItems } from '../api/data.js';

let homeTemplate = (token, movies, onSearch, searchParams) => html`
<div class="jumbotron jumbotron-fluid text-light" style="background-color: #343a40;">
    <img src="https://s.studiobinder.com/wp-content/uploads/2019/06/Best-M-Night-Shyamalan-Movies-and-Directing-Style-StudioBinder.jpg"
        class="img-fluid" alt="Responsive image">
    <h1 class="display-4">Movies</h1>
    <p class="lead">Unlimited movies, TV shows, and more. Watch anywhere. Cancel anytime.</p>
</div>

${token != null 
? html`
<h1 class="text-center">Movies</h1>
<section>
    <a href="/create" class="btn btn-warning ">Add Movie</a>
    <form @submit=${onSearch} class="search float-right">
        <label>Search: </label>
        <input type="text" name="search" .value=${searchParams || ''}>
        <input type="submit" class="btn btn-info" value="Search">
    </form>
</section>

<div class=" mt-3 ">
    <div class="row d-flex d-wrap">

        <div class="card-deck d-flex justify-content-center">

        ${movies.length 
        ? html `
        ${movies.map(movie => movieTemplate(movie))}` 
        : html `<h3>No movies...</h3>`}
           
        </div>
    </div>
</div>`
: ''}`;

let movieTemplate = (movie) => html `
 <div class="card mb-4">
    <img class="card-img-top" src="${movie.img}"
        alt="Card image cap" width="400">
    <div class="card-body">
        <h4 class="card-title">${movie.title}</h4>
    </div>
    <div class="card-footer">
        <a href="/details/${movie._id}"><button type="button" class="btn btn-info">Details</button></a>
    </div>
</div>`;

export async function homePage(ctx) {
    // console.log('dashboardPage');  
    let searchParams = ctx.querystring.split('=')[1];
    let token = sessionStorage.getItem('token');
    let movies = await getAllItems(searchParams)
    ctx.setUserNav();
    ctx.render(homeTemplate(token, movies, onSearch, searchParams));
    
    async function onSearch(ev) {
        ev.preventDefault();
        let form = new FormData(ev.target);
        let input = form.get('search').trim();
        ctx.page.redirect(`/?search=${input}`);        
    }
}