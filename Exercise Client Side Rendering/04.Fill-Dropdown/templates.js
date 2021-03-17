import { html } from '../node_modules/lit-html/lit-html.js'

let create = (towns) => html`
<select id="menu">
    ${towns.map( t => html `<option value=${t._id}>${t.text}</option>`)}
</select>`

export default create;
