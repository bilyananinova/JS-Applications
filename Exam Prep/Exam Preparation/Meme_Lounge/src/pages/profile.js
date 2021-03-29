import { html } from '../../node_modules/lit-html/lit-html.js';
import { getItemByUserId } from '../api/data.js';

let profileTemplate = (allUserMemes) => html`
<!-- Profile Page ( Only for logged users ) -->
<section id="user-profile-page" class="user-profile">
    <article class="user-info">
        <img id="user-avatar-url" alt="user-profile" src="/images/${sessionStorage.getItem('gender')}.png">
        <div class="user-content">
            <p>Username: ${sessionStorage.getItem('username')}</p>
            <p>Email: ${sessionStorage.getItem('email')}</p>
            <p>My memes count: ${allUserMemes.length}</p>
        </div>
    </article>
    <h1 id="user-listings-title">User Memes</h1>
    <div class="user-meme-listings">

        ${allUserMemes.length > 0 
        ? html `
        <!-- Display : All created memes by this user (If any) -->
        ${allUserMemes.map(meme => memeTeplate(meme))}` 
        : html `
        <!-- Display : If user doesn't have own memes  -->
        <p class="no-memes">No memes in database.</p>`}
        
    </div>
</section>`;

let memeTeplate = (meme) => html`
<div class="user-meme">
    <p class="user-meme-title">${meme.title}</p>
    <img class="userProfileImage" alt="meme-img" src="${meme.imageUrl}">
    <a class="button" href="/details/${meme._id}">Details</a>
</div>`;

export async function profilePage(ctx) {
    console.log('profilePage');
    console.log('token', sessionStorage.getItem('token'))
    console.log("user", sessionStorage.getItem('userId'))
    console.log('gender', sessionStorage.getItem('gender'))
    console.log('email', sessionStorage.getItem('email'))
    console.log('username', sessionStorage.getItem('username'))

    let userId = sessionStorage.getItem('userId')
    let allUserMemes = await getItemByUserId(userId)
    ctx.render(profileTemplate(allUserMemes))

}