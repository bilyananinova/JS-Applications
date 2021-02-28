function lockedProfile() {
    getProfile()
}

async function getProfile() {
    let url = `http://localhost:3030/jsonstore/advanced/profiles`;
    let response = await fetch(url);
    let data = await response.json();

    let main = document.getElementById('main');
    main.innerHTML = '';
    Object.values(data).forEach((element, i) => {

        let divProfile = create('div', ['class=profile']);
        let img = create('img', ['src=./iconProfile2.png', 'class=userIcon']);
        let labelLock = create('label', '', 'Lock');
        let inputLock = create('input', ["type=radio", 'name=user1Locked', "value=lock"]);
        inputLock.setAttribute('checked', "");
        let labelUnlock = create('label', '', 'Unlock');
        let inputUnlock = create('input', ["type=radio", 'name=user1Locked', "value=unlock"]);
        let hrProfile = create('hr');
        let labelUsername = create('label', '', 'Username');
        let inputUsername = create('input', ["type=text", `name=user1Username`, `value=${element.username}`]);
        inputUsername.setAttribute("disabled", "");
        inputUsername.setAttribute("readonly", "");
        let button = create('button', '', 'Show more');
        let divUserInfo = create('div', ['id=user1HiddenFields']);
        let hrHide = create('hr');
        let labelEmail = create('label', '', 'Email:');
        let inputEmail = create('input', ["type=email", "name=user1Email", `value=${element.email}`]);
        inputEmail.setAttribute("disabled", "");
        inputEmail.setAttribute("readonly", "");
        let labelAge = create('label', '', 'Age:');
        let inputAge = create('input', ["type=email", "name=user1Age", `value=${element.age}`]);
        inputAge.setAttribute("disabled", "");
        inputAge.setAttribute("readonly", "");

        main.appendChild(append(divProfile, img, labelLock, inputLock, labelUnlock, inputUnlock, hrProfile, labelUsername, inputUsername, button))
        divProfile.appendChild(append(divUserInfo, hrHide, labelEmail, inputEmail, labelAge, inputAge))

        button.addEventListener('click', (ev) => {
            console.log(document.querySelector('input[type=radio]:checked').value == 'lock');
            if (document.querySelector('input[type=radio]:checked').value == 'lock' == false) {
                divUserInfo.style.display = divUserInfo.style.display == 'block' ? 'none' : 'block'

                ev.target.textContent = ev.target.textContent == 'Show more' ? 'Hide it' : 'Show more'
            }
        });


    });

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
        element.innerHTML = content;
    }
    return element;

}

function append(parent, ...elements) {
    while (elements.length) {
        parent.appendChild(elements.shift())
    }

    return parent
}
