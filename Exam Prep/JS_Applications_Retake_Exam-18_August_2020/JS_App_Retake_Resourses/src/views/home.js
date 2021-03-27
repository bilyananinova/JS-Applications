import { html } from '../../node_modules/lit-html/lit-html.js';
import { getItems } from '../api/data.js';

let homeTemplate = (shoes) => html`
${sessionStorage.getItem('token') != null ? userHome(shoes) : guestHome()}
`;

let userHome = (shoes) => html`
<div class="shoes">
    ${shoes.length > 0 
        ? html`
        ${shoes.map(shoe => shoeTemplate(shoe))}` 
    : html` 
    <h1>No shoe to display. Be the first to create a new offer...</h1>`}
</div>`;

let shoeTemplate = (shoe) => html`
<div class="shoe">
    <img src="${shoe.img}">
    <h3>${shoe.title}</h3>
    <a href="/details/${shoe._id}">Buy it for $${shoe.price}</a>
</div>`;

let guestHome = () => html`
<div class="container">
    <div class="about-us">
        <div>
            <img src="/public/shoes.jpg" alt="">
            <img src="/public/shoes2.jpg" alt="">
        </div>
        <p>
            <a href="/register">Register Now</a> and Try it!
        </p>
    </div>
</div>`;

export async function homePage(ctx) {
    console.log('home');
    let shoes = await getItems();
    ctx.setUserNav();
    ctx.render(homeTemplate(Object.values(shoes)));
}