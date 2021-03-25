import { html } from '../../node_modules/lit-html/lit-html.js';
import { getItems } from '../api/data.js';


let homeTemplate = (data) => html`
<div class="content">
    <section class="js">
        <h2>JavaScript</h2>
        <div class="articles">
            ${createArticles('JavaScript', data)}
        </div>
    </section>
    <section class="CSharp">
        <h2>C#</h2>
        <div class="articles">
            ${createArticles('CSharp', data)}
        </div>
    </section>
    <section class="Java">
        <h2>Java</h2>
        <div class="articles">
            ${createArticles('Java', data)}
        </div>
    </section>
    <section class="Python">
        <h2>Python</h2>
        <div class="articles">
            ${createArticles('Python',data)}
        </div>
    </section>
    
</div>`;

function createArticles(category, data) {
    let listArticles = data.filter(d => d.category == category)
    if (listArticles.length == 0) {
        return html `<h3 class="no-articles">No articles yet</h3>`;
    } else {
        return  listArticles.map(d => html`
        <article>
                <h3>${d.title}</h3>
                    <p>${d.content}</p>
                ${sessionStorage.getItem('token') 
                ? html `<a href="/details/${d._id}" class="btn details-btn">Details</a>` 
                : ''}
        </article>`)
    }
}

export async function homePage(ctx) {
    console.log('home');
    let articles = await getItems();
    ctx.render(homeTemplate(Object.values(articles)))
  
}
