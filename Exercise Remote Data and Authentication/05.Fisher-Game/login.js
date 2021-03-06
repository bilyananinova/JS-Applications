let [registerForm, loginForm] = document.getElementsByTagName('form')

registerForm.addEventListener('submit', register);
loginForm.addEventListener('submit', login);

async function register(ev) {
    ev.preventDefault();

    let formData = new FormData(ev.target);

    let email = formData.get('email');
    let password = formData.get('password');
    let repass = formData.get('rePass');

    if (email == '' || password == '' || repass == '') {
        alert('All field are required!');
    } else if (password != repass) {
        alert('Passwords don\'t match!');
    }

    let response = await fetch('http://localhost:3030/users/register', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })

    let data = await response.json();
    if (response.ok) {
        sessionStorage.setItem('accessToken', data.accessToken);
        window.location.pathname = 'index.html';
    } else {
        return alert(data.message);
    }

    ev.target.reset()
}

async function login(ev) {
    ev.preventDefault();

    let formData = new FormData(ev.target);

    let email = formData.get('email');
    let password = formData.get('password');

    let response = await fetch('http://localhost:3030/users/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })

    let data = await response.json()
    if (response.ok) {
        sessionStorage.setItem('accessToken', data.accessToken)
        window.location.pathname = 'index.html'
    } else {
        return alert(data.message)
    }

    ev.target.reset()

}
