let url = 'http://localhost:3030/jsonstore/collections/books';
let tbody = document.querySelector('tbody');

function attachedFunction() {
    document.getElementById('loadBooks').addEventListener('click', loadAllBooks);
    document.querySelector('#createForm').addEventListener('submit', createBook);
    tbody.addEventListener('click', editOrDeleteBook);
    document.getElementById('editForm').addEventListener('submit', update);
    document.querySelector('#editForm [type="button"]').addEventListener('click', () => {
        document.querySelector('#editForm').style.display = 'none';
        document.querySelector('#createForm').style.display = 'block';
    });
}

attachedFunction();

async function loadAllBooks() {
    let response = await fetch(url);
    await errorHendler(response)
    let data = await response.json();

    tbody.innerHTML = '';

    Object.entries(data).forEach(v => {
        tbody.appendChild(create(v));
    });

}

function create([id, book]) {
    let tr = document.createElement('tr');
    tr.id = id
    let titleTd = document.createElement('td');
    titleTd.textContent = book.title;

    let authorTd = document.createElement('td');
    authorTd.textContent = book.author;

    let btns = document.createElement('td');
    let editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'editBtn';
    btns.appendChild(editBtn);

    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    editBtn.className = 'deleteBtn';

    btns.appendChild(deleteBtn);

    tr.appendChild(titleTd);
    tr.appendChild(authorTd);
    tr.appendChild(btns);

    return tr;
}

async function createBook(ev) {
    ev.preventDefault();
    let data = new FormData(ev.target);

    let title = data.get('title');
    let author = data.get('author');
    postNewBook({ title, author });

    ev.target.reset();
    loadAllBooks();
}

async function postNewBook(data) {
    let options = {
        method: 'post',
        headers: { 'Content-Type': 'applications/json' },
        body: JSON.stringify(data)
    }

    let response = await fetch(url, options);
    await errorHendler(response);
    let post = await response.json();

}

function editOrDeleteBook(ev) {
    if (ev.target.tagName == 'BUTTON' && ev.target.textContent == 'Edit') {
        document.querySelector('#editForm').style.display = 'block';
        document.querySelector('#createForm').style.display = 'none';
        let id = ev.target.parentNode.parentNode.id;
        editBook(id)
    } else if (ev.target.tagName == 'BUTTON' && ev.target.textContent == 'Delete') {
        let confirmation = confirm('Are you sure you want to delete this book?');
        if (confirmation) {
            let id = ev.target.parentNode.parentNode.id;
            deleteBook(id)
        }
    }
}

async function editBook(id) {
    let response = await fetch('http://localhost:3030/jsonstore/collections/books/' + id);
    await errorHendler(response);
    let data = await response.json();

    document.querySelector('#editForm [name="id"]').value = id;
    document.querySelector('#editForm [name="title"]').value = data.title;
    document.querySelector('#editForm [name="author"]').value = data.author;

}

async function update(ev) {
    ev.preventDefault();

    let data = new FormData(ev.target);
    let id = data.get('id');
    let book = {
        title: data.get('title'),
        author: data.get('author')
    }

    let response = await fetch(`http://localhost:3030/jsonstore/collections/books/` + id, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
    });
    await errorHendler(response)
    document.querySelector('#editForm').style.display = 'none';
    document.querySelector('#createForm').style.display = 'block';

    ev.target.reset();

    loadAllBooks();
}

async function deleteBook(id) {

    let response = await fetch('http://localhost:3030/jsonstore/collections/books/' + id, {
        method: 'delete'
    });
    let data = await response.json();

    loadAllBooks();
}

async function errorHendler(response) {
    if (response.ok != true) {
        let error = await response.json();
        alert(error.message);
        throw new Error(error.message);
    } else {
        return response;
    }
}