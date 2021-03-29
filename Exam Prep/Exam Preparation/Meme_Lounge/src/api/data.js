import * as api from './api.js';

let host = 'http://localhost:3030'
api.settings.host = host;

export let login = api.login;
export let register = api.register;
export let logout = api.logout;

export async function getAllItems() {
    return await api.get(host + '/data/memes?sortBy=_createdOn%20desc')
}

export async function getItemById(id) {
    return await api.get(host + '/data/memes/' + id)
}

export async function getItemByUserId(userId) {
    return await api.get(host + `/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export async function createItem(body) {
    return await api.post(host + '/data/memes', body)
}

export async function updateItem(id, body) {
    return await api.put(host + '/data/memes/' + id, body)
}

export async function deleteItem(id) {
    return await api.del(host + '/data/memes/' + id)
}