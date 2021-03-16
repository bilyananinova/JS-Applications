import { html } from '../node_modules/lit-html/lit-html.js';

let createTemplate = (towns, input) => html`
<ul>
    ${towns.map((town) => html`
    <li class=${input && town.toLowerCase().includes(input.toLowerCase()) ? 'active' : '' }>${town}</li>`)}
</ul>`

export default createTemplate