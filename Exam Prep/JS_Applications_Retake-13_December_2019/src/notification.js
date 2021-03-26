import { html } from '../node_modules/lit-html/lit-html.js';

export function showError(msg) {
    return html`
    <div id="notifications">
        <div id="errorBox" class="alert alert-danger" role="alert">${msg}</div>
    </div>`;
}

export function showLoading(msg) {
    return html`
<div id="notifications">
    <div id="successBox" class="alert alert-success" role="alert">${msg}</div>
    <div id="loadingBox" class="alert alert-info" role="alert">Loading...</div>
</div>`;
}