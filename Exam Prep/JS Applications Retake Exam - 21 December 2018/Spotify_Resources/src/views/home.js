import { html } from '../../node_modules/lit-html/lit-html.js';

let homeTemplate = () => html`
<section id="homeView">
    <img class="m-auto background-image" width="100%" src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80">
</section>`;

export async function homePage(ctx) {
    console.log('home');
    ctx.setUserNav();
    ctx.render(homeTemplate());
}