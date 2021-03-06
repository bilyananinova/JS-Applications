let loadBtn = document.querySelector('.load')
function attachEvents() {
    if (sessionStorage.accessToken) {
        window.addEventListener('load', (ev) => {
            logInUsers()
            loadCatches(ev)
        })
    } else {
        loadBtn.addEventListener('click', loadCatches);
    }
}

attachEvents();

async function loadCatches(ev) {
    ev.preventDefault();
    let response = await fetch('http://localhost:3030/data/catches');
    let data = await response.json();
    data.forEach(d => {
        createCatch(d)
    });
}

function logInUsers() {
    document.querySelector(".add").disabled = false;

    document.querySelector('body').addEventListener('click', (ev) => {
        if (ev.target.className == 'update') {
            console.log('click update button');
            updateCatch();
        } else if (ev.target.className == 'delete') {
            console.log('click delete button');
            deleteCatch();
        } else if (ev.target.className == 'add') {
            addCatch();
        }
    })
    console.log(sessionStorage.accessToken);
}

function createCatch(data) {
    let catches = document.querySelector('#catches');

    let catchDiv = create('div', ['class=catch']);
    
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
    
    let updateBtn = create('button', ['disabled=true', 'class=update'], 'Update');
    let deleteBtn = create('button', ['disabled=true', 'class=delete'], 'Delete');
    
    catchDiv.appendChild(updateBtn);
    catchDiv.appendChild(deleteBtn);
    
    catches.appendChild(catchDiv);
}

async function addCatch() {

    let fieldset = document.querySelector('#addForm')

    let angler = fieldset.querySelector('.angler').value
    let weight = fieldset.querySelector('.weight').value
    let species = fieldset.querySelector('.species').value
    let location = fieldset.querySelector('.location').value
    let bait = fieldset.querySelector('.bait').value
    let captureTime = fieldset.querySelector('.captureTime').value

    if(angler == '' || weight == '' || species == '' || location == '' || bait == '' || captureTime == '') {
        alert('All fields are required!')
    }

    await fetch('http://localhost:3030/data/catches', {
            method: 'post',
            headers: {
                "Content-type": "application/json",
                "X-Authorization": sessionStorage.accessToken,
            },
            body: JSON.stringify({ angler, weight, species, location, bait, captureTime }),
        })
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

