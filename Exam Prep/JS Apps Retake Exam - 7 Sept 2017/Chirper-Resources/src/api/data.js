import * as api from './api.js';

let host = 'http://localhost:3030'
api.settings.host = host;

export let login = api.login;
export let register = api.register;
export let logout = api.logout;

export async function getAllItems() {
    return await api.get(host + '/jsonstore/chirps')
}

export async function getAllUsers() {
    return await api.get(host + '/jsonstore/users')
}

export async function getItemById(id) {
    return await api.get(host + '/jsonstore/pets/' + id)
}

export async function createItem(body) {
    return await api.post(host + '/jsonstore/chirps', body)
}

export async function createUser(body) {
    return await api.post(host + '/jsonstore/users', body)
}

export async function updateUser(id, body) {
    return await api.put(host + '/jsonstore/users/' + id, body)
}

export async function deleteItem(id) {
    return await api.del(host + '/jsonstore/chirps/' + id)
}