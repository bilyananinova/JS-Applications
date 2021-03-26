import { html } from '../../node_modules/lit-html/lit-html.js';
import { getItemById, deleteItem, updateItem } from '../api/data.js';


let detailsTemplate = (idea, owner, user, deleteIdea, likeIdea, postComment) => html`
<div class="container home some">
    <img class="det-img" src="${idea.img}" />
    <div class="desc">
        <h2 class="display-5">${idea.title}</h2>
        <p class="infoType">Description:</p>
        <p class="idea-description">${idea.description}</p>
        <p class="infoType">Likes: <large>${idea.likes}</large></p>
        ${idea.comments.length > 0 
        ? html `
        <p class="infoType">Comments:</p>
        <ul>
            ${idea.comments.map(comment => html `
            <li class="comment">${comment.user} : ${comment.comment}</li>`)}
        </ul>`
        : html`
        <p class="infoType">Comments:</p>
        <ul>
            <li class="comment">No comments yet :(</li>
        </ul>`}
    </div>
    ${owner == user
    ? html`<div class="text-center"><a @click=${deleteIdea} class="btn detb" href="javascript:void(0)">Delete</a></div>`
    : html`
    <form class="text-center" method="" action="">
        <textarea class="textarea-det" name="newComment" id=""></textarea>
        <button @click=${postComment} type="submit" class="btn detb">Comment</button>
        <a @click=${likeIdea} class="btn detb" href="javascript:void(0)">Like</a>
    </form>`}
</div>`;

export async function detailsPage(ctx) {
    console.log('details', ctx.params.id);

    let idea = await getItemById(ctx.params.id);
    let owner = idea._ownerId;
    let user = sessionStorage.getItem('ownerId');

    async function deleteIdea() {
        let confirmation = confirm('Are you sure you want to delete this idea?');
        if (confirmation) {
            await deleteItem(ctx.params.id);
            ctx.page.redirect('/dashboard');
        }

    }

    async function likeIdea() {
        let likes = idea.likes++;
        let body = Object.assign({}, idea)
        body.likes = likes;
        await updateItem(ctx.params.id, body)
        ctx.render(detailsTemplate(idea, owner, user, deleteIdea, likeIdea));
    }

    async function postComment(ev) {
        ev.preventDefault()
        let comment = document.querySelector('textarea');
        let user = sessionStorage.getItem('email')
        let body = Object.assign({}, idea);
        let commentInfo = {
            comment: comment.value,
            user, 
        }
        body.comments.push(commentInfo);
        await updateItem(ctx.params.id, body)
        ctx.render(detailsTemplate(idea, owner, user, deleteIdea, likeIdea, postComment));
        comment.value = ''

    }

    ctx.render(detailsTemplate(idea, owner, user, deleteIdea, likeIdea, postComment));
}