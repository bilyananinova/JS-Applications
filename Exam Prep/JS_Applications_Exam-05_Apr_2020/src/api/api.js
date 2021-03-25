export let settings = {
    host: '',
}

export async function get(url) {
    let response = await fetch(url)
    let data = response.json()
    return data;
}

export async function post(url, body) {
    let response = await fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': sessionStorage.getItem('token')
        },
        body: JSON.stringify(body)
    })

    let data = response.json()
    return data;
}

export async function put(url, body) {
    let response = await fetch(url, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': sessionStorage.getItem('token')
        },
        body: JSON.stringify(body)
    })

    return response.json()

}

export async function del(url) {
    let response = await fetch(url, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': sessionStorage.getItem('token')
        }
    })

    return response
}

export async function login(email, password) {
    let response = await fetch(settings.host + '/users/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })

    if (response.status == 200) {
        let data = await response.json();
        sessionStorage.setItem('token', data.accessToken);
        sessionStorage.setItem('email', data.email);
        sessionStorage.setItem('ownerId', data._id);

        return response;
    } else {
        let error = await response.json();
        return error.message;
    }
}

export async function register(email, password) {

    let response = await fetch(settings.host + '/users/register', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })

    if (response.ok) {
        let data = await response.json();
        sessionStorage.setItem('token', data.accessToken);
        sessionStorage.setItem('ownerId', data._id);
        sessionStorage.setItem('email', data.email);

        return response;
    } else {
        let error = await response.json();
        return error.message;
    }

}

export async function logout() {
    let response = await fetch(settings.host + '/users/logout', {
        method: 'get',
        headers: {
            'X-Authorization': sessionStorage.getItem('token')
        },
    });

    if (response.status == 200) {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('ownerId');
        sessionStorage.removeItem('email');
        sessionStorage.clear();
        return response;
    } else {
        let error = await response.json();
        return error.message;
    }
}
