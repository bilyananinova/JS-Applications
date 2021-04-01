import * as api from './api.js';

let host = 'http://localhost:3030'
api.settings.host = host;

export let login = api.login;
export let register = api.register;
export let logout = api.logout;

export async function getAllItems() {
    return await api.get(host + '/jsonstore/pets')
}

export async function getItemById(id) {
    return await api.get(host + '/jsonstore/pets/' + id)
}

export async function createItem(body) {
    return await api.post(host + '/jsonstore/pets', body)
}

export async function updateItem(id, body) {
    return await api.put(host + '/jsonstore/pets/' + id, body)
}

export async function deleteItem(id) {
    return await api.del(host + '/jsonstore/pets/' + id)
}