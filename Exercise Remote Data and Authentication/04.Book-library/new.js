let url = 'http://localhost:3030/jsonstore/collections/books';
let tbody = document.querySelector('tbody');

function attachedFunction() {
    document.getElementById('loadBooks').addEventListener('click', loadAllBooks);
    document.querySelector('#createForm').addEventListener('submit', createBook);
    tbody.addEventListener('click', editOrDeleteBook);
    loadAllBooks();
}

attachedFunction();

async function loadAllBooks() {
    let response = await fetch(url);
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
    btns.appendChild(editBtn);

    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
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
    let post = await response.json();

}

function editOrDeleteBook(ev) {
    if (ev.target.tagName == 'BUTTON' && ev.target.textContent == 'Edit') {
        document.querySelector('#editForm').style.display = 'block';
        document.querySelector('#createForm').style.display = 'none';
        let id = ev.target.parentNode.parentNode;
        editBook(id)
    } else if (ev.target.tagName == 'BUTTON' && ev.target.textContent == 'Delete') {
        console.log('delete');
    }
}

async function editBook(ev) {
    ev.preventDefault();
    let data = new FormData(ev.target);
    let id = data.get('id')
    let book = {
        title: data.get('title'),
        author: data.get('author')
    }

    let response = await fetch(`http://localhost:3030/jsonstore/collections/books/` + id, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
    });

    ev.target.reset();
    loadAllBooks();
}

// async function request(response) {
//     if (response.ok != true) {
//         let error = await response.json();
//         alert(error.message);
//         throw new Error(error.message);
//     }
// }