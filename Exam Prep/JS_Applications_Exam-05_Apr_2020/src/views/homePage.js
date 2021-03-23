import { html } from '../../node_modules/lit-html/lit-html.js';
import { getItems, login } from '../api/data.js';


let homeTemplate = (items) => html`
<div class="content">
    ${items.map(item => html`
${item.category == 'JavaScript' 
? articleJS(item) 
: html`<section class="js"><h2>JavaScript</h2><h3 class="no-articles"> No articles yet</h3></section>`}
${item.category == 'CSharp' 
? articleCSharp(item)
: html`<section class="CSharp"><h2>C#</h2><h3 class="no-articles"> No articles yet</h3></section>`}
${item.category == 'Java' 
? articleJava(item)
:  html`<section class="Java"><h2>Java</h2><h3 class="no-articles"> No articles yet</h3></section>`}
${item.category == 'Python' 
? articlePython(item)
: html`<section class="Pyton"><h2>Pyton</h2><h3 class="no-articles"> No articles yet</h3></section>`}`
)}
</div>`

let articleJS = (item) => html `
<section class="js">
    <h2>JavaScript</h2>
    <div class="articles">
        <article>
            <h3>${item.title}</h3>
            <p>${item.content}</p>
            <a href="/details/${item._id}" class="btn details-btn">Details</a>
        </article>
    </div>
</section>`;

let articleCSharp = (item) => html`<section class="CSharp">
<h2>C#</h2>
<div class="articles">
    <article>
        <h3>${item.title}</h3>
        <p>${item.content}</p>
        <a href="/details/${item._id}" class="btn details-btn">Details</a>
    </article>
</div>
</section>`;

let articleJava = (item) => html` <section class="Java">
<h2>Java</h2>
<div class="articles">
    <article>
        <h3>${item.title}</h3>
        <p>${item.content}</p>
        <a href="/details/${item._id}" class="btn details-btn">Details</a>
    </article>
</div>
</section>`;

let articlePython = (item) =>  html` <section class="Pyton">
<h2>Pyton</h2>
<div class="articles">
    <article>
        <h3>${item.title}</h3>
        <p>${item.content}</p>
        <a href="/details/${item._id}" class="btn details-btn">Details</a>
    </article>
</div>
</section>`;

let loginTemplate = (submit) => html`
<div class="container auth">
    <form @submit=${submit}>
        <fieldset>
            <legend>Login</legend>
            <blockquote>Knowledge is like money: to be of value it must circulate, and in circulating it can
                increase in quantity and, hopefully, in value</blockquote>
            <p class="field email">
                <input type="email" id="email" name="email" placeholder="maria@email.com">
                <label for="email">Email:</label>
            </p>
            <p class="field password">
                <input type="password" id="login-pass" name="password">
                <label for="login-pass">Password:</label>
            </p>
            <p class="field submit">
                <button class="btn submit" type="submit">Log In</button>
            </p>
            <p class="field">
                <span>If you don't have profile click <a href="/register">here</a></span>
            </p>
        </fieldset>
    </form>
</div>`;


export async function homePage(ctx) {
    console.log('home');
    let token = sessionStorage.getItem('token');
    let articles = await getItems();

    if (token == null) {
        ctx.render(loginTemplate(submit));
    } else {
        ctx.render(homeTemplate(Object.values(articles)));
    }

    async function submit(ev) {
        ev.preventDefault();

        let formData = new FormData(ev.target);
        let email = formData.get('email').trim();
        let password = formData.get('password').trim();

        await login(email, password);
        ctx.setUserNav();
        ctx.render(homeTemplate(Object.values(articles)));
    }


}