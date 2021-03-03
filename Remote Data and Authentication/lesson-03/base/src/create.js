let form = document.querySelector('form')

form.addEventListener('submit', (ev) => {
    ev.preventDefault();

    let formData = new FormData(ev.target);

    let name = formData.get('name');
    let img = formData.get('img');
    let ingredients = formData.get('ingredients').split('\n').map(l => l.trim()).filter(l => l != '');
    let steps = formData.get('steps').split('\n').map(l => l.trim()).filter(l => l != '');

    create(name, img, ingredients, steps);
});

async function create(name, img, ingredients, steps) {
    let token = sessionStorage.getItem('authToken')
    let url = 'http://localhost:3030/data/recipes';
    let options = {
        method: 'post',
        headers: {
             'Content-Type': 'application/json',
             'X-Authorization': token
             },
        body: JSON.stringify({ name, img, ingredients, steps })
    };

    let response = await fetch(url, options);

    let data = await response.json();

    if (response.ok) {
        window.location.pathname = "index.html"
    } else {
        return alert(data.message);
    }
}