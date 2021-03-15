import { html } from './node_modules/lit-html/lit-html.js';

let createTamplate = (data) => html`
<div class="contact card">
    <div>
        <i class="far fa-user-circle gravatar"></i>
    </div>
    <div class="info">
        <h2>Name: ${data.name}</h2>
        <button @click=${showDetails} class="detailsBtn">Details</button>
        <div class="details" id="1">
            <p>Phone number: ${data.phoneNumber}</p>
            <p>Email: ${data.email}</p>
        </div>
    </div>
</div>`;

function showDetails(ev) {
    let parent = ev.target.parentNode;
   parent.querySelector('.details').style.display == 'block' 
   ? parent.querySelector('.details').style.display = 'none' 
   : parent.querySelector('.details').style.display = 'block';
}


export default createTamplate