import { html } from '../../node_modules/lit-html/lit-html.js';
import { getHomeItems } from '../api/data.js';

let homeTemplate = (articles) => html`
<section id="home-page" class="content">
    <h1>Recent Articles</h1>
    <section class="recent js">
        <h2>JavaScript</h2>
        ${articleTemplate('JavaScript', articles)}
    </section>
    <section class="recent csharp">
        <h2>C#</h2>
        ${articleTemplate('C#', articles)}
    </section>
    <section class="recent java">
        <h2>Java</h2>
        ${articleTemplate('Java', articles)}
    </section>
    <section class="recent python">
        <h2>Python</h2>
        ${articleTemplate('Python', articles)}
    </section>
</section>`;

function articleTemplate(category, article) {
    let listArticles = article.filter(d => d.category == category);
    if (listArticles.length == 0) {
        return html`<h3 class="no-articles">No articles yet</h3>`;
    } else {
        return listArticles.map(article => html`
        <article>
            <h3>${article.title}</h3>
            <p>${article.content}</p>
            <a href="/details/${article._id}" class="btn details-btn">Details</a>
        </article>`)
    }
}

export async function homePage(ctx) {
    // console.log('homePage');
    let articles = await getHomeItems();
    ctx.render(homeTemplate(articles));
}