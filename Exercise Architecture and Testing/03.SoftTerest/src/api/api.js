export let settings = {
    host: ''
}

async function request(url, options) {
    let response = await fetch(url, options);

    if (response.ok == false) {
        let error = await response.json();
        alert(error.message);
        throw new Error(error.message);
    }

    let data = await response.json();
    return data;
}

function options(method = 'get', data) {
    let result = {
        method,
        headers: {}
    };

    if (data) {
        result.headers['Content-Type'] = 'application/json'
        result.body = JSON.stringify(data)
    }

    let token = sessionStorage.getItem('token')
    if (token != null) {
        result.headers['X-Authorization'] = token
    }

    return result
}

export async function get(url) {
    return request(url, options())
}

export async function post(url, data) {
    return request(url, options('post', data))
}

export async function put(url, data) {
    return request(url, options('put', data))
}

export async function del(url) {
    return request(url, options('delete'))
}

export async function login(email, password) {
    const response = await post(settings.host + '/users/login', { email, password })

    sessionStorage.setItem('token', response.accessToken);
    sessionStorage.setItem('email', response.email);
    sessionStorage.setItem('ownerId', response._id);

    return response
}

export async function register(email, password) {
    const response = await post(settings.host + '/users/register', { email, password })

    sessionStorage.setItem('token', response.accessToken);
    sessionStorage.setItem('email', response.email);
    sessionStorage.setItem('ownerId', response._id);

    return response
}

export async function logout() {
    const response = await get(settings.host + '/users/logout')

    sessionStorage.removeItem('token');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('ownerId');

    return response
}