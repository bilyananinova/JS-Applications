import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllItems, getItemById ,deleteItemById, updateItemById } from '../api/data.js';
import { notify, success } from '../notification.js';

let catalogTemplate = (songs, onDelete, likeSong, listenSong) => html`
<section id="allSongsView">
    <div class="background-spotify">
        <div class="song-container">
            <h1>All Songs</h1>
            <a href="/create">
                <button type="button" class="btn-lg btn-block new-song-btn">Add a new song</button>
            </a>

            ${songs.map(song => songTemplate(song, onDelete, likeSong, listenSong))}

        </div>
    </div>
</section>`;

let songTemplate = (song, onDelete, likeSong, listenSong) => html`
<div class="song"  data-id=${song._id}>
    <h5>Title: ${song.title}</h5>
    <h5>Artist: ${song.artist}</h5>
    <img class="cover" src="${song.img}" />
    ${sessionStorage.getItem('ownerId') == song._ownerId 
    ? html `<p>Likes: ${song.likes}; Listened ${song.listened} times</p>
        <a @click=${onDelete} href="javascript:void(0)"><button type="button" class="btn btn-danger mt-4">Remove</button></a>
        <a @click=${listenSong} href="javascript:void(0)"><button type="button" class="btn btn-success mt-4">Listen</button></a>` 
    : html `<p>Likes: ${song.likes}</p>
        <a @click=${likeSong} href="javascript:void(0)"><button type="button" class="btn btn-primary mt-4">Like</button></a>`}
</div>`;

export async function catalogPage(ctx) {
    console.log('catalog');
    let songs = await getAllItems();
    ctx.render(catalogTemplate(Object.values(songs), onDelete, likeSong, listenSong));
    
    async function onDelete(ev) {
        try{
            let id = ev.target.parentNode.parentNode.dataset.id;
            await deleteItemById(id);
            ctx.page.redirect('/catalog');
            success('Song removed successfully!');
        } catch(err) {
            notify(err.message);
        }
    }
    
    async function likeSong(ev) {
        try{
            let id = ev.target.parentNode.parentNode.dataset.id;
            let song = await getItemById(id);
            let body = Object.assign({}, song);
            body.likes++
            await updateItemById(id, body);
            ctx.page.redirect('/catalog');
            success('Liked!');
        } catch(err){
            notify(err.message);
        }
        
    }

    async function listenSong(ev) {
        try{
            let id = ev.target.parentNode.parentNode.dataset.id;
            let song = await getItemById(id);
            let body = Object.assign({}, song);
            body.listened++
            await updateItemById(id, body);
            success(`You just listened ${song.title}`);
            ctx.page.redirect('/catalog');
        } catch (err) {
            notify(err.message);
        }
        
    }
    
}