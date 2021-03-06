let catches = document.querySelector('#catches');
let user = sessionStorage.getItem('ownerId')

function attachEvents() {
    document.querySelector('.load').addEventListener('click', loadCatches);
    if (sessionStorage.accessToken) {
        logInUsers();
    }
}

attachEvents();

async function loadCatches() {
    let response = await fetch('http://localhost:3030/data/catches');
    let data = await response.json();
    catches.innerHTML = '';

    data.forEach(d => {
        createCatch(d);
    });
}

function logInUsers() {
    document.querySelector(".add").disabled = false;

    document.querySelector('body').addEventListener('click', (ev) => {
        if (ev.target.className == 'update') {
            console.log('click update button');
            let parent = ev.target.parentNode;
            let id = ev.target.parentNode.id;
            console.log(id);
            updateCatch(parent, id);
        } else if (ev.target.className == 'delete') {
            console.log('click delete button');
            let parent = ev.target.parentNode;
            let id = ev.target.parentNode.id;
            console.log(id);
            deleteCatch(parent, id);
        } else if (ev.target.className == 'add') {
            console.log('click add button');
            addCatch();
        }
    })
    console.log(sessionStorage.accessToken);
}

function createCatch(data) {
    let catchDiv = create('div', ['class=catch', `id=${data._id}`]);

    let angLabel = create('label', '', 'Angler');
    let angInput = create('input', ['type=text', 'class=angler', `value=${data.angler}`]);
    let angHr = create('hr');

    catchDiv.appendChild(angLabel);
    catchDiv.appendChild(angInput);
    catchDiv.appendChild(angHr);

    let weigthLabel = create('label', '', 'Weight');
    let weigthInput = create('input', ['type=number', 'class=weight', `value=${data.weight}`]);
    let weigthHr = create('hr');

    catchDiv.appendChild(weigthLabel);
    catchDiv.appendChild(weigthInput);
    catchDiv.appendChild(weigthHr);

    let speciesLabel = create('label', '', 'Species');
    let speciesInput = create('input', ['type=text', 'class=species', `value=${data.species}`]);
    let speciesHr = create('hr');

    catchDiv.appendChild(speciesLabel);
    catchDiv.appendChild(speciesInput);
    catchDiv.appendChild(speciesHr);

    let locationLabel = create('label', '', 'Location');
    let locationInput = create('input', ['type=text', 'class=location', `value=${data.location}`]);
    let locationHr = create('hr');

    catchDiv.appendChild(locationLabel);
    catchDiv.appendChild(locationInput);
    catchDiv.appendChild(locationHr);

    let baitLabel = create('label', '', 'Bait');
    let baitInput = create('input', ['type=text', 'class=bait', `value=${data.bait}`]);
    let baitHr = create('hr');

    catchDiv.appendChild(baitLabel);
    catchDiv.appendChild(baitInput);
    catchDiv.appendChild(baitHr);

    let captureTimeLabel = create('label', '', 'Capture Time');
    let captureTimeInput = create('input', ['type=number', 'class=captureTime', `value=${data.captureTime}`]);
    let captureTimeHr = create('hr');

    catchDiv.appendChild(captureTimeLabel);
    catchDiv.appendChild(captureTimeInput);
    catchDiv.appendChild(captureTimeHr);

    let updateBtn = create('button', ['class=update', 'disabled=true'], 'Update');
    let deleteBtn = create('button', ['class=delete', 'disabled=true'], 'Delete');

    if (data._ownerId == user) {
        updateBtn.disabled = false;
        deleteBtn.disabled = false;
    }

    catchDiv.appendChild(updateBtn);
    catchDiv.appendChild(deleteBtn);

    catches.appendChild(catchDiv);
}

async function addCatch() {

    let fieldset = document.querySelector('#addForm')

    let angler = fieldset.querySelector('.angler').value;
    let weight = fieldset.querySelector('.weight').value;
    let species = fieldset.querySelector('.species').value;
    let location = fieldset.querySelector('.location').value;
    let bait = fieldset.querySelector('.bait').value;
    let captureTime = fieldset.querySelector('.captureTime').value;

    if (angler == '' || weight == '' || species == '' || location == '' || bait == '' || captureTime == '') {
        alert('All fields are required!');
    } else {
        await fetch('http://localhost:3030/data/catches', {
            method: 'post',
            headers: {
                "Content-type": "application/json",
                "X-Authorization": sessionStorage.accessToken,
            },
            body: JSON.stringify({ angler, weight, species, location, bait, captureTime }),
        })

        fieldset.querySelector('.angler').value = '';
        fieldset.querySelector('.weight').value = '';
        fieldset.querySelector('.species').value = '';
        fieldset.querySelector('.location').value = '';
        fieldset.querySelector('.bait').value = '';
        fieldset.querySelector('.captureTime').value = '';

    }

    loadCatches();
}

async function updateCatch(parent, id) {

    let angler = parent.querySelector('.angler').value;
    let weight = parent.querySelector('.weight').value;
    let species = parent.querySelector('.species').value;
    let location = parent.querySelector('.location').value;
    let bait = parent.querySelector('.bait').value;
    let captureTime = parent.querySelector('.captureTime').value;

    let response = await fetch(`http://localhost:3030/data/catches/` + id, {
        method: 'put',
        headers: {
            "Content-type": "application/json",
            "X-Authorization": sessionStorage.accessToken
        },
        body: JSON.stringify({ angler, weight, species, location, bait, captureTime }),
    })
    let data = await response.json();
    console.log(data);


    if (response.ok) {
        alert('Update was successful!');
    } else {
        alert('Something goes wrong! ;(');
    }

    loadCatches();
}

async function deleteCatch(parent, id) {

    let confirmation = confirm('Are you sure you want to delete this catch!');

    if (confirmation) {
        let response = await fetch(`http://localhost:3030/data/catches/` + id, {
            method: 'delete',
            headers: {
                "Content-type": "application/json",
                "X-Authorization": sessionStorage.accessToken
            }
        })

        let data = await response.json();
        parent.remove();
        console.log(data);
    }

    loadCatches();
}

function create(type, attributes, content) {
    let element = document.createElement(type);
    if (attributes) {
        while (attributes.length) {
            let [type, value] = attributes.shift().split('=')
            element.setAttribute(type, value);
        }
    }
    if (content) {
        element.textContent = content;
    }
    return element;

}
