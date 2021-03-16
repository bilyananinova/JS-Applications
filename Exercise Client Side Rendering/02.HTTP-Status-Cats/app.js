import { html, render } from '../node_modules/lit-html/lit-html.js'
import { cats } from './catSeeder.js';
import createTemplate from './template.js';

let allCats = document.querySelector('#allCats');
let catsUl = html`
<ul @click=${show}>
    ${cats.map(createTemplate)}
</ul>`
render(catsUl, allCats)

function show(ev) {
    let parent = ev.target.parentNode
    let status = parent.querySelector('.status')
    if (ev.target.tagName == 'BUTTON') {
        status.style.display == 'block' ? status.style.display = 'none' : status.style.display = 'block'
        ev.target.textContent == 'Hide status code' ? ev.target.textContent = 'Show status code' : ev.target.textContent = 'Hide status code'
    }
}