import { html } from '../../node_modules/lit-html/lit-html.js';
import { getItems } from '../api/data.js';

let dashboardTemplate = (list) => html`<div class="row space-top">
    <div class="col-md-12">
        <h1>Welcome to Furniture System</h1>
        <p>Select furniture from the catalog to view details.</p>
    </div>
</div>
<div class="row space-top">
    ${list.map(item  => html`
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

export async function dashboardPage(ctx) {
    // console.log('dashboardPage');
    let list = await getItems();
    ctx.setUserNav();
    ctx.render(dashboardTemplate(list));
}
