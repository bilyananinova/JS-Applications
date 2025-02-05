import * as api from './api.js';

let host = 'http://localhost:3030';
api.settings.host = host;

export let login = api.login;
export let register = api.register;
export let logout = api.logout;


export async function getItems() {
    return await api.get(host + '/jsonstore/softerest/ideas')
}

export async function getItemById(id) {
    return await api.get(host + '/jsonstore/softerest/ideas/' + id);
}

export async function createItem(item) {
    return await api.post(host + '/jsonstore/softerest/ideas', item);
}

export async function updateItem(id, item) {
    return await api.put(host + '/jsonstore/softerest/ideas/' + id, item);
}

export async function deleteItem(id) {
    return await api.del(host + '/jsonstore/softerest/ideas/' + id);
}