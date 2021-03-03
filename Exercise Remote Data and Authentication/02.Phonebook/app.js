function attachEvents() {
    document.getElementById('btnLoad').addEventListener('click', load);
    document.getElementById('btnCreate').addEventListener('click', create);
}

attachEvents();

async function load() {
    let url = 'http://localhost:3030/jsonstore/phonebook';
    let response = await fetch(url);
    let data = await response.json();

    let phones = Object.values(data);
    createList(phones);
}

function createList(phones) {
    let ul = document.getElementById('phonebook');
    ul.innerHTML = ''
    phones.forEach(element => {
        let li = document.createElement('li');
        li.textContent = `${element.person}: ${element.phone}`
        let button = document.createElement('button');
        button.textContent = 'Delete';
        button.id = `${element._id}`
        li.appendChild(button);
        ul.appendChild(li);

        button.addEventListener('click', async (ev) => {
            ev.target.parentNode.remove()
            let id = ev.target.id;

            let response = await fetch('http://localhost:3030/jsonstore/phonebook/' + id, {
                method: 'delete',
            });

            let result = await response.json()
        });

    });
}

async function create() {
    let person = document.getElementById('person').value;
    let phone = document.getElementById('phone').value;

    let data = { person, phone };

    let response = await fetch('http://localhost:3030/jsonstore/phonebook', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    let result = await response.json();
    load();
}

