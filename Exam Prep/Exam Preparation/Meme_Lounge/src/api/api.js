export let settings = {
    host: ''
};

async function request(url, options) {
    try {
        let response = await fetch(url, options);

        if (response.ok == false) {
            let error = await response.json();
            // alert(error.message);
            throw new Error(error.message);
        }

        try {
            let data = await response.json();
            return data;
        } catch (err) {
            return response;
        }

    } catch (err) {
        console.error(err.message);
        throw err;
    }

}

function options(method, data) {
    let options = {
        method,
        headers: {}
    };

    if (data) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    let token = sessionStorage.getItem('token');
    if (token != null) {
        options.headers['X-Authorization'] = token;
    }

    return options;
}

export async function get(url) {
    return request(url, options()) //!!!!  да се извика options
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

export async function login(email, password, username, gender) {
    let response = await post(settings.host + '/users/login', { email, password, username, gender})

    sessionStorage.setItem('token', response.accessToken);
    sessionStorage.setItem('email', response.email);
    sessionStorage.setItem('userId', response._id);
    sessionStorage.setItem('gender', response.gender);
    sessionStorage.setItem('username', response.username);

    return response
}

export async function register(email, password, username, gender) {
    let response = await post(settings.host + '/users/register', { email, password, username, gender})

    sessionStorage.setItem('token', response.accessToken);
    sessionStorage.setItem('email', response.email);
    sessionStorage.setItem('userId', response._id);
    sessionStorage.setItem('gender', response.gender);
    sessionStorage.setItem('username', response.username);

    return response
}

export async function logout() {
    let response = await get(settings.host + '/users/logout')

    sessionStorage.removeItem('token');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('gender');
    sessionStorage.removeItem('username');
    sessionStorage.clear();

    return response
}