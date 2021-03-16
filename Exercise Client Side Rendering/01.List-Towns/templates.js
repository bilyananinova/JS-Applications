import { html } from '../node_modules/lit-html/lit-html.js';

let createTemplates = (towns) => html`
<ul>
    ${towns.map((town) => html`<li>${town}</li>`)}
</ul>`

export default createTemplates;