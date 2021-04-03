import * as api from './api.js';

let host = 'http://localhost:3030'
api.settings.host = host;

export let login = api.login;
export let register = api.register;
export let logout = api.logout;

export async function getAllItems(query) {
    if (query) {
        return await api.get(host + '/data/movies?where=' + encodeURIComponent(`title LIKE "${query}"`))
    } else {
        return await api.get(host + '/data/movies')
    }
}

export async function getItemById(id) {
    return await api.get(host + '/data/movies/' + id)
}

export async function createItem(body) {
    return await api.post(host + '/data/movies', body)
}

export async function updateItem(id, body) {
    return await api.put(host + '/data/movies/' + id, body)
}

export async function deleteItem(id) {
    return await api.del(host + '/data/movies/' + id)
}

export async function postLike(body) {
    return await api.post(host + '/data/likes', body)
}

export async function getAllLikesForMovie(movieId) {
    return await api.get(host + `/data/likes?where=movieId%3D%22${movieId}%22&distinct=_ownerId&count`)
}

export async function getAllLikesByUser(movieId, userId) {
    return await api.get(host + `/data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22 `)
}