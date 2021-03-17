import { render } from '../node_modules/lit-html/lit-html.js';
import * as api from './api/data.js';
import layout from './templates.js';

let ctx = {
    list: [],
    async load() {
        ctx.list = await api.getBooks();
        update()
    },
    editedBook(id) {
        let book = ctx.list.find(b => b._id == id)
        update(book)
    },
    async deletedBook(id) {
        let confirmation = confirm('Are you sure you want to delete this book?');
        if (confirmation) {
            await api.deleteBookById(id);
        }
    }
}

let submit = {
    'add-form': create,
    'edit-form': edit
}

document.body.addEventListener('submit', (ev) => {
    ev.preventDefault();
    let data = new FormData(ev.target)
    submit[ev.target.id](data, ev.target);
})

start()

async function start() {
    update()
}

function update(editBook) {
    let result = layout(ctx, editBook);
    render(result, document.body);
}

async function create(formData, form) {
    let book = {
        'title': formData.get('title'),
        'author': formData.get('author')
    }

    await api.createBook(book);
    form.reset();
}

async function edit(formData, form) {
    let id = formData.get('_id')
    let book = {
        'title': formData.get('title'),
        'author': formData.get('author')
    }

    await api.editBook(id, book);
    form.reset();
    update();
}