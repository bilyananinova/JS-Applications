import { render } from '../node_modules/lit-html/lit-html.js';
import createTemplates from './templates.js';

let root = document.querySelector('#root');
document.querySelector('#btnLoadTowns').addEventListener('click', (ev) => {
    ev.preventDefault();
    let towns = document.querySelector('input').value.split(', ');
    let listItems = createTemplates(towns);
    render(listItems, root);
})
