import { showDetails } from './detailsMovie.js'

async function getMovieById(id) {
    let response = await fetch('http://localhost:3030/data/movies/' + id);
    let data = await response.json();
    return data
}

async function update(ev, id) {

    let formData = new FormData(ev.target);

    if (sessionStorage.getItem('accessToken') == null) {
        return alert('You\'re not logged in!');
    }

    let title = formData.get('title');
    let description = formData.get('description');
    let imageUrl = formData.get('imageUrl');

    // if (title == '' || description == '' || imageUrl == '') {
    //     return alert('All fields are required!');
    // }

    let response = await fetch('http://localhost:3030/data/movies/' + id, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': sessionStorage.getItem('accessToken')
        },
        body: JSON.stringify({ title, description, imageUrl })
    })

    if (response.status == 200) {
        showDetails(id);
    } else {
        throw new Error(await response.json());
    }

    console.log(response);
}

let main;
let section;

export async function setupEdit(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;


}

export async function showEdit(id) {
    main.innerHTML = '';
    main.appendChild(section)

    let movie = await getMovieById(id)
    
    let form = section.querySelector('.text-center.border.border-light.p-5');

    
    form.addEventListener('submit', (ev) => {
        ev.preventDefault();
        debugger
        update(ev, movie._id)
    });
}