import { showHome } from './homePage.js'

export async function deleteMovieById(id) {
    let confirmation = confirm('Are you sure you want to delete this movie?');

    if (confirmation) {
        let response = await fetch('http://localhost:3030/data/movies/' + id, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': sessionStorage.getItem('accessToken')
            },
        })
        if (response.ok) {
            alert('Movie deleted');
            showHome()
        }

    }

}
