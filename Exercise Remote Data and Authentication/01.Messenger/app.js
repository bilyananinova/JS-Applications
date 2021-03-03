function attachEvents() {
    document.getElementById('submit').addEventListener('click', send);
    document.getElementById('refresh').addEventListener('click', refresh);
}

attachEvents();

async function send() {
    let author = document.querySelector('input[name=author]').value;
    let content = document.querySelector('input[name=content]').value;
    let message = { author, content };

    let url = 'http://localhost:3030/jsonstore/messenger';
    let options = {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message)
    }
    let response = await fetch(url, options)
    let data = await response.json();
}

async function refresh() {
    let url = 'http://localhost:3030/jsonstore/messenger';
    let response = await fetch(url);
    let data = await response.json();
    let result = Object.values(data).map(v => `${v.author}: ${v.content}`).join('\n');
    document.getElementById('messages').value = result;
}