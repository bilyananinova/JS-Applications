import * as api from './api.js';

let host = 'http://localhost:3030'
api.settings.host = host;

export let login = api.login;
export let register = api.register;
export let logout = api.logout;

export async function getAllItems(query) {
    if(query) {
        return await api.get(host + `/data/wiki?where=title%20LIKE%20%22${query}%22`)
    } else {
        return await api.get(host + '/data/wiki?sortBy=_createdOn%20desc')
    }
}

export async function getHomeItems() {
    return await api.get(host + '/data/wiki?sortBy=_createdOn%20desc&distinct=category')
}

export async function getItemById(id) {
    return await api.get(host + '/data/wiki/' + id)
}

export async function createItem(body) {
    return await api.post(host + '/data/wiki', body)
}

export async function updateItem(id, body) {
    return await api.put(host + '/data/wiki/' + id, body)
}

export async function deleteItem(id) {
    return await api.del(host + '/data/wiki/' + id)
}
