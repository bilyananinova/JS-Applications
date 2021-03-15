import { render } from './node_modules/lit-html/lit-html.js';
import { contacts } from './contacts.js';
import createTamplate from './tamplate.js';

let main = document.getElementById('contacts')

function start() {
    let result = contacts.map(createTamplate)
    render(result, main)
}

start()
