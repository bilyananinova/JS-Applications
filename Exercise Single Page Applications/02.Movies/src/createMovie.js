import { showDetails } from './detailsMovie.js'

async function addMovie(ev) {
    let formData = new FormData(ev.target);

    let title = formData.get('title');
    let description = formData.get('description');
    let imageUrl = formData.get('imageUrl');

    if (title == '' || description == '' || imageUrl == '') {
        return alert('All fields are required!');
    }

    let response = await fetch('http://localhost:3030/data/movies', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': sessionStorage.getItem('accessToken')
        },
        body: JSON.stringify({ title, description, imageUrl })
    })

    let data = await response.json();

    if (response.status == 200) {
        let id = data._id
        showDetails(id)
    } else {
        return alert('Something is wrong!')
    }

    ev.target.reset()
}


let main;
let section;

export function setupCreate(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;

    let form = section.querySelector('.text-center.border.border-light.p-5');

    form.addEventListener('submit', (ev) => {
        ev.preventDefault();
        addMovie(ev);
    });
}

export function showCreate() {
    main.innerHTML = '';
    main.appendChild(section)


}