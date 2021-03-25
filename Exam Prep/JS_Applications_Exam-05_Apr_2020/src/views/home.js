import { html } from 'lit-html';
import { getItems } from '../api/data.js';

let jsArticles = [];
let csharpArticles = [];
let javaArticles = [];
let pythonArticles = [];

let homeTemplate = (jsArticles, csharpArticles, javaArticles, pythonArticles) => html`
<div class="content">
    <section class="js">
        <h2>JavaScript</h2>
        <div class="articles">
            ${jsArticles.map(article => articleTemp(article))}
        </div>
    </section>
    <section class="CSharp">
        <h2>C#</h2>
        <div class="articles">
            ${csharpArticles.map(article => articleTemp(article))}
        </div>
    </section>
    <section class="Java">
        <h2>Java</h2>
        <div class="articles">
            ${javaArticles.map(article => articleTemp(article))}
        </div>
    </section>
    <section class="Python">
        <h2>Python</h2>
        <div class="articles">
            ${pythonArticles ? pythonArticles.map(article => articleTemp(article)) : html `<h3 class="no-articles">No articles yet</h3>`}
        </div>
    </section>
</div>`

let articleTemp = (item) => html`
<article>
    <h3>${item.title}</h3>
    <p>${item.content}</p>
    ${sessionStorage.getItem('token') 
    ? html `<a href="/details/${item._id}" class="btn details-btn">Details</a>` 
    : ''}
</article>`;


export async function homePage(ctx) {
    console.log('home');
    let articles = await getItems();

    Object.values(articles).forEach(article => {
        if (article.category == 'JavaScript') {
            jsArticles.push(article);
        } else if (article.category == 'CSharp') {
            csharpArticles.push(article);
        } else if (article.category == 'Java') {
            javaArticles.push(article);
        } else if (article.category == 'Python') {
            pythonArticles.push(article);
        }

    })

    ctx.render(homeTemplate(jsArticles, csharpArticles, javaArticles, pythonArticles))
}
