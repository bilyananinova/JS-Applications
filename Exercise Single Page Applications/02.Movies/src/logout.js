import { showHome } from './homePage.js'

export async function logout() {
    let response = await fetch('http://localhost:3030/users/logout', {
        method: 'get',
        headers: {
            'X-Authorization': sessionStorage.getItem('accessToken')
        },
    });

    if (response.status == 200) {
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('email');
        sessionStorage.clear();
        [...document.querySelectorAll('nav .guest')].forEach(l => l.style.display = 'block');
        [...document.querySelectorAll('nav .user')].forEach(l => l.style.display = 'none');
        
        showHome();
    } else {
        console.error(await response.json());
    }
}


