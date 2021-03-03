let form = document.querySelector('form')

form.addEventListener('submit', (ev) => {
    ev.preventDefault();

    let formData = new FormData(ev.target);

    let email = formData.get('email');
    let pass = formData.get('password');
    let rePass = formData.get('rePass');

    if (email == '' || pass == '') {
        return alert('All fields are required!');
    } else if (pass != rePass) {
        return alert('Passwords don\'t match!');
    }

    register(email, pass);
})

async function register(email, password) {
    let url = 'http://localhost:3030/users/register';
    let options = {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    let response = await fetch(url, options);

    let data = await response.json();
    if (response.ok) {
        sessionStorage.setItem('authToken', data.accessToken);
        window.location.pathname = "index.html"
    } else {
        return alert(data.message);
    }
}