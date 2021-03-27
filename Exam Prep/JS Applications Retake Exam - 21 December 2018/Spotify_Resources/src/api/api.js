import { notify } from '../notification.js';

export let settings = {
    host: ''
}

export async function get(url) {
    try {
        let response = await fetch(url);

        if (response.ok == false) {
            let error = await response.json();
            alert(error.message);
            throw new Error(error.message);
        }

        let data = await response.json();

        try {
            return data;
        } catch (err) {
            return response;
        }
    } catch (err) {
        console.error(err.message);
        throw err;
    }
}

export async function getByUser(url) {
    try {
        let response = await fetch(url);

        if (response.ok == false) {
            let error = await response.json();
            alert(error.message);
            throw new Error(error.message);
        }

        let data = await response.json();

        try {
            return data;
        } catch (err) {
            return response;
        }
    } catch (err) {
        console.error(err.message);
        throw err;
    }
}

export async function post(url, body) {
    try {
        let response = await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': sessionStorage.getItem('accessToken')
            },
            body: JSON.stringify(body)
        });

        if (response.ok == false) {
            let error = await response.json();
            alert(error.message);
            throw new Error(error.message);
        }

        let data = await response.json();

        try {
            return data;
        } catch (err) {
            return response
        }
    } catch (err) {
        console.error(err.message);
        throw err;
    }
}

export async function put(url, body) {
    try {
        let response = await fetch(url, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': sessionStorage.getItem('accessToken')
            },
            body: JSON.stringify(body)
        });

        if (response.ok == false) {
            let error = await response.json();
            alert(error.message);
            throw new Error(error.message);
        }

        let data = await response.json();

        try {
            return data;
        } catch (err) {
            return response;
        }
    } catch (err) {
        console.error(err.message);
        throw err;
    }
}

export async function del(url) {
    try {
        let response = await fetch(url, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': sessionStorage.getItem('accessToken')
            },
        })

        if (response.ok == false) {
            let error = await response.json();
            alert(error.message);
            throw new Error(error.message);
        }

        let data = await response.json();

        try {
            return data;
        } catch (err) {
            return response;
        }
    } catch (err) {
        console.error(err.message);
        throw err;
    }
}

export async function login(email, password) {
    let response = await fetch(settings.host + '/users/login', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });


    if (response.ok == false) {
        let error = await response.json();
        notify(error.message);
        throw new Error(error.message);
    }

    let data = await response.json();

    try {

        try {
            sessionStorage.setItem('accessToken', data.accessToken);
            sessionStorage.setItem('ownerId', data._id);
            sessionStorage.setItem('email', data.email);

        } catch (err) {
            return alert(response);
        }

    } catch (err) {
        console.error(err.message);
        throw err;
    }
}

export async function register(email, password) {
    let response = await fetch(settings.host + '/users/register', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    try {

        if (response.ok == false) {
            let error = await response.json();
            alert(error.message);
            throw new Error(error.message);
        }

        try {
            let data = await response.json();

            sessionStorage.setItem('accessToken', data.accessToken);
            sessionStorage.setItem('ownerId', data._id);
            sessionStorage.setItem('email', data.email);

        } catch (err) {
            return alert(response);
        }

    } catch (err) {
        console.error(err.message);
        throw err;
    }
}

export async function logout() {
    let response = await fetch('http://localhost:3030/users/logout', {
        method: 'get',
        headers: {
            'X-Authorization': sessionStorage.getItem('accessToken')
        }
    });

    try {

        if (response.ok == false) {
            let error = await response.json();
            alert(error.message);
            throw new Error(error.message);
        }

        try {
            sessionStorage.removeItem('accessToken');
            sessionStorage.removeItem('ownerId');
            sessionStorage.removeItem('email');
            sessionStorage.clear();

        } catch (err) {
            return alert(response);
        }

    } catch (err) {
        console.error(err.message);
        throw err;
    }
}