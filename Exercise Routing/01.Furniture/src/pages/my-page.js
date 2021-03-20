import { html } from '../../node_modules/lit-html/lit-html.js';
import { getItemByUserId } from '../api/data.js';

let myPageTemplate = (items) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>My Furniture</h1>
        <p>This is a list of your publications.</p>
    </div>
</div>
<div class="row space-top">
    ${items.map(item => html`
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src="${item.img}"/>
                <p>Description here</p>
                <footer>
                    <p>Price: <span>${item.price} $</span></p>
                </footer>
                <div>
                    <a href="/details/${item._id}" class="btn btn-info">Details</a>
                </div>
            </div>
        </div>
    </div>`)}
</div>`;

export async function myPage(ctx) {
    // console.log('myPage');

    let items = await getItemByUserId(sessionStorage.getItem('ownerId'));
    ctx.render(myPageTemplate(items));
}