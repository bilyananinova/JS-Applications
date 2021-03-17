import { html } from '../node_modules/lit-html/lit-html.js';

let rows = (book) => html`
<tr >
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td id=${book._id}>
        <button class="editBtn">Edit</button>
        <button class="deleteBtn">Delete</button>
    </td>
</tr>`

let table = (ctx) => html`
<table>
    <thead>
        <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody @click=${e=> onClick(e, ctx)}>
        ${ctx.list.map(rows)}
    </tbody>
</table>`

let createForm = () => html`
<form id="add-form">
    <h3>Add book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title...">
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author...">
    <input type="submit" value="Submit">
</form>`

let editForm = (editBook) => html`
<form id="edit-form">
    <input type="hidden" name="_id" .value=${editBook._id}>
    <h3>Edit book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title..." .value=${editBook.title}>
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author..." .value=${editBook.author}>
    <input type="submit" value="Save">
</form>`

let layout = (ctx, editBook) => html`
<button @click=${ctx.load} id="loadBooks">LOAD ALL BOOKS</button>
${table(ctx)}
${editBook ? editForm(editBook) : createForm()}`

function onClick(ev, ctx) {
    if (ev.target.classList.contains('editBtn')) {
        const id = ev.target.parentNode.id;
        ctx.editedBook(id);
    } else if (ev.target.classList.contains('deleteBtn')) {
        const id = ev.target.parentNode.id;
        ctx.deletedBook(id)
    }
}

export default layout
