import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllItems } from '../api/data.js';

let searchTemplate = (onSearch, result, query) => html`
<section id="search-page" class="content">
    <h1>Search</h1>
    <form id="search-form">
        <p class="field search">
            <input  type="text" placeholder="Search by article title" name="search" .value=${query || ''}>
        </p>
        <p class="field submit">
            <input  @click=${onSearch} class="btn submit" type="submit" value="Search">
        </p>
    </form>
    <div class="search-container">

    ${result.length > 0 
    ? html `${result.map(r => resultTemplate(r))}` 
    : html `<h3 class="no-articles">No matching articles</h3>`}

        
    </div>
</section>`;

let resultTemplate = (article) => html`
<a class="article-preview" href="/details/${article._id}">
    <article>
        <h3>Topic: <span>${article.title}</span></h3>
        <p>Category: <span>${article.category}</span></p>
    </article>
</a>`;


export async function searchPage(ctx) {
    // console.log('searchPage');
    let query = ctx.querystring.split('=')[1];
    
    let result = await getAllItems(query);
    ctx.render(searchTemplate(onSearch, result));

    function onSearch(ev) {
        ev.preventDefault();
        let input = document.querySelector('[name="search"]').value;
        ctx.page.redirect('/search?title=' + input);
    }
}