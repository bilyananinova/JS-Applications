import * as api from './api.js';

let host = 'http://localhost:3030/jsonstore/collections/books';
api.settings.host = host;

export async function getBooks() {
    return Object
        .entries(await api.get(host))
        .map(([k, v]) => Object.assign(v, { _id: k }))
}

export async function getBookById(id) {
    return await api.get(host + '/' + id);
}

export async function createBook(book) {
    return await api.post(host, book);
}

export async function editBook(id, book) {
    const response = await fetch(host + '/' + id, {
        method: 'put',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(book)
    });
}

export async function deleteBookById(id) {
    return await api.del(host + '/' + id);
}