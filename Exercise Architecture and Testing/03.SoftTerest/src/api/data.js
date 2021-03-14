import * as api from './api.js';

let host = 'http://localhost:3030';
api.settings.host = host;

export let login = api.login;
export let register = api.register;
export let logout = api.logout;

export async function getIdeas() {
    return await api.get(host + '/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc')
}

export async function getIdeaById(id) {
    return await api.get(host + '/data/ideas/' + id);
}

export async function createIdeas(idea) {
    return await api.post(host + '/data/ideas', idea);
}

export async function deleteIdeasById(id) {
    return await api.del(host + '/data/ideas/' + id);
}