let section = document.querySelector('section');

window.addEventListener('load', async () => {
    let url = `http://localhost:3030/jsonstore/advanced/articles/list`;

    try {
        let response = await fetch(url);
        let titles = await response.json();
        section.innerHTML = '';
        Object.values(titles).forEach(title => {
            createArticle(title.title, title._id);
            getText(title._id);
        });
    } catch (error) {
        alert(error)
    }

});

function createArticle(title, id) {
    let divAccordion = create('div', ['id=accordion']);
    let divHead = create('div', ['class=head'], title);
    let span = create('span', ['class=button'], 'More');
    divHead.appendChild(span);

    let divExtra = create('div', ['id=extra']);
    let p = create('p', [`id=${id}`]);
    divExtra.appendChild(p);

    divAccordion.appendChild(divHead);
    divAccordion.appendChild(divExtra);
    section.appendChild(divAccordion);

    span.addEventListener('click', toggle)
};

async function getText(id) {
    let url = `http://localhost:3030/jsonstore/advanced/articles/details/` + id;

    try {

        let response = await fetch(url);
        let data = await response.json();

        let p = document.getElementById(id);
        p.textContent = data.content;
    } catch (error) {
        alert(error)
    }
};

function toggle(ev) {
    let accordionDiv = ev.target.parentNode.parentNode;
    let extra = accordionDiv.querySelector('#extra');
    let button = accordionDiv.querySelector('.button');

    extra.style.display = extra.style.display == 'block' ? 'none' : 'block';
    button.textContent = button.textContent == 'More' ? 'Less' : 'More';
};

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

};