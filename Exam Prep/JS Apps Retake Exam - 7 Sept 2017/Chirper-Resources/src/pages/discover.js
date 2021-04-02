import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllUsers } from '../api/data.js';

let discoverTemplate = (users) => html`
<section id="viewDiscover">
    <div class="content">
        <div class="chirps">
            <h2 class="titlebar">Discover</h2>
            <div id="userlist">

                ${users.map(user => row(user))}
            </div>
        </div>
    </div>
</section>`;

let row = (user) => html`
<div class="userbox">
    <div><a href="/profile/${user.username}" class="chirp-author">${user.username}</a></div>

    <div class="user-details">
        <span>${user.subscriptions.length} followers</span>
    </div>
</div>`;

export async function discoverPage(ctx) {
    // console.log('dashboardPage');
    let allusers = await getAllUsers()
    let users = Object.values(allusers).filter(user => user.username != sessionStorage.getItem('email'))
    console.log();
    ctx.render(discoverTemplate(users));
}