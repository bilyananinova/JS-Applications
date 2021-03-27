import * as api from './api.js';

let host = 'http://localhost:3030';
api.settings.host = host;

export let register = api.register;
export let login = api.login;
export let logout = api.logout;

export async function getAllItems() {
    return await api.get(host + '/jsonstore/songs')
}  

export async function getItemById(id) {
    return await api.get(host + '/jsonstore/songs/' + id)
}  

export async function getItemsByUser(userId) {
    return await api.getByUser(host + `/jsonstore/songs?where=_ownerId%3D%22${userId}%22`)
} 

export async function createItem(body) {
    return await api.post(host + '/jsonstore/songs', body)
}

export async function updateItemById(id, body) {
    return await api.put(host + '/jsonstore/songs/' + id, body)
} 

export async function deleteItemById(id) {
    return await api.del(host + '/jsonstore/songs/' + id)
} 