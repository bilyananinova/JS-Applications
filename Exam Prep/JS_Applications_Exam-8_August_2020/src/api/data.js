import * as api from './api.js';

let host = 'http://localhost:3030';
api.settings.host = host;

export let login = api.login;
export let register = api.register;
export let logout = api.logout;

export async function getLike(id) {
    return await api.getAllLikes(host + `/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`)
}

export async function getLikeByUserId(id,user) {
    return await api.getLikesByUser(host +`/data/likes?where=movieId%3D%22${id}%22%20and%20_ownerId%3D%22${user}%22`)
}

export async function postLikes(item) {
    return await api.post(host + '/data/likes', item);
}

export async function getItems(search) {
    if(search) {
        return await api.get(host + '/data/movies?where=' + encodeURIComponent(`title LIKE "${search}"`))
    } else {
        return await api.get(host + '/data/movies')
    }
}

export async function getItemById(id) {
    return await api.get(host + '/data/movies/' + id);
}

export async function createItem(item) {
    return await api.post(host + '/data/movies', item);
}

export async function updateItem(id, item) {
    return await api.put(host + '/data/movies/' + id, item);
}

export async function deleteItem(id) {
    return await api.del(host + '/data/movies/' + id);
}