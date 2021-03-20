import * as api from './api.js';

let host = 'http://localhost:3030';
api.settings.host = host;

export let login = api.login;
export let register = api.register;
export let logout = api.logout;

export async function getItems() {
    return await api.get(host + '/data/catalog')
}

export async function getItemById(id) {
    return await api.get(host + '/data/catalog/' + id);
}

export async function getItemByUserId(userId) {
    return await api.get(host + `/data/catalog?where=_ownerId%3D%22${userId}%22`);
}

export async function createItem(item) {
    return await api.post(host + '/data/catalog', item);
}

export async function updateItem(id, item) {
    return await api.put(host + '/data/catalog/' + id, item);
}

export async function deleteItem(id) {
    return await api.del(host + '/data/catalog/' + id);
}