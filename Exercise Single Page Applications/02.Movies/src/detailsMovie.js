import { create } from './dom.js';
import { showEdit } from './editMovie.js'
import { deleteMovieById } from './deleteMovie.js'

async function getLikeByMovie(id) {
    let response = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`);
    let data = await response.json();

    return data;

}

async function getLikeByUser(id) {

    let user = sessionStorage.getItem('ownerId');
    let response = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22%20and%20_ownerId%3D%22${user}%22`);
    let data = await response.json();

    return data;
}

async function getMovieById(id) {
    let response = await fetch('http://localhost:3030/data/movies/' + id);
    let data = await response.json();

    return data;
}

function createMoviecard(movie, likes, ownlike) {
    let container = create('div', ['class=container', `id=${movie._id}`]);
    let div = create('div', ["class=row bg-light text-dark"]);
    let title = create('h1', '', `Movie title: ${movie.title}`);
    let col8 = create('div', ['class=col-md-8']);
    let img = create('img', ["class=img-thumbnail", `src=${movie.img}`, 'alt=Movie']);
    div.appendChild(title);
    div.appendChild(col8);
    col8.appendChild(img);
    let col4 = create('div', ['class=col-md-4 text-center']);
    let h3 = create('h3', ['class=my-3'], 'Movie Description');
    let description = create('p', '', `${movie.description}`);
    col4.appendChild(h3);
    col4.appendChild(description);

    if (sessionStorage.getItem('accessToken') !== null) {
        if (movie._ownerId !== sessionStorage.getItem('ownerId')) {
            if (ownlike.length == 0) {
                let like = create('a', ["class=btn btn-primary", "href=#"], 'Like');

                col4.appendChild(like);
                like.addEventListener('click', likeMovie)
            }
        } else {
            let del = create('a', ["class=btn btn-danger", "href=#"], 'Delete');
            let edit = create('a', ["class=btn btn-warning", "href=#"], 'Edit');

            col4.appendChild(del);
            col4.appendChild(edit);
            del.addEventListener('click', (ev) => {
                ev.preventDefault();
                deleteMovieById(container.id)
            })
            edit.addEventListener('click', (ev) => {
                ev.preventDefault();
                showEdit(container.id)
            })

        }
    }

    let span = create('span', ["class=enrolled-span"], `Liked ${likes}`);
    col4.appendChild(span);

    div.appendChild(col4);
    container.appendChild(div);

    return container;

    async function likeMovie(ev) {
        ev.preventDefault();
        const token = sessionStorage.getItem('accessToken');
        const response = await fetch('http://localhost:3030/data/likes', {
            method: 'post',
            headers: {
                'Content-type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify({ movieId: movie._id })
        });

        if (response.ok) {
            ev.target.remove()
            likes++;
            span.textContent = `Liked ${likes}`
        }
    }
}

let main;
let section;

export function setupDetails(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;
}

export async function showDetails(id) {
    section.innerHTML = '';
    main.innerHTML = '';
    main.appendChild(section);
    console.log(id);
    let [movie, likes, ownlike] = await Promise.all([
        getMovieById(id),
        getLikeByMovie(id),
        getLikeByUser(id)
    ]);
    console.log(ownlike);
    let detail = createMoviecard(movie, likes, ownlike);
    section.appendChild(detail);


}
