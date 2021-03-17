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

