import { html } from '../../node_modules/lit-html/lit-html.js';
import { createItem } from '../api/data.js';

let createTemplate = (submit, invMake, invModel, invYear, invDesc, invPrice, invImg) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Create New Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${submit}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-make">Make</label>
                <input class=${'form-control' + (invMake == true ? ' is-invalid' : '') + (invMake == false ? ' is-valid' : '')} id="new-make" type="text" name="make">
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Model</label>
                <input class=${'form-control' + (invModel == true ? ' is-invalid' : '') + (invModel == false ? ' is-valid' : '')} id="new-model" type="text" name="model">
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class=${'form-control' + (invYear == true ? ' is-invalid' : '') + (invYear == false ? ' is-valid' : '')} id="new-year" type="number" name="year">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-description">Description</label>
                <input class=${'form-control' + (invDesc == true ? ' is-invalid' : '') + (invDesc == false ? ' is-valid' : '')} id="new-description" type="text" name="description">
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-price">Price</label>
                <input class=${'form-control' + (invPrice == true ? ' is-invalid' : '') + (invPrice == false ? ' is-valid' : '')} id="new-price" type="number" name="price">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-image">Image</label>
                <input class=${'form-control' + (invImg == true ? ' is-invalid' : '') + (invImg == false ? ' is-valid' : '')} id="new-image" type="text" name="img">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-material">Material (optional)</label>
                <input class="form-control" id="new-material" type="text" name="material">
            </div>
            <input type="submit" class="btn btn-primary" value="Create" />
        </div>
    </div>
</form>`;

export async function createPage(ctx) {
    // console.log('createPage');

    ctx.render(createTemplate(submit));

    async function submit(ev) {
        ev.preventDefault();
        debugger
        let formData = new FormData(ev.target);

        let data = [...formData.entries()].reduce((a, [k, v]) => Object.assign(a, { [k]: v }), {});

        if (Object.entries(data).filter(([k, v]) => k != 'material').some(([k, v]) => v == '')) {
            [...document.querySelectorAll('.form-control')].forEach(i => i.classList.add('is-invalid'))
            return alert('Missing fields!');
        }

        let invMake = false;
        let invModel = false;
        let invYear = false;
        let invDesc = false;
        let invPrice = false;
        let invImg = false;

        if (formData.get('make').length < 4) {
            invMake = true;
            alert('Make must be at least 4 symbols long');
        }

        if (formData.get('model').length < 4) {
            invModel = true;
            alert('Model must be at least 4 symbols long');
        }

        if (formData.get('year') < 1950 || formData.get('year') > 2050) {
            invYear = true;
            alert('Year must be between 1950 and 2050');
        }

        if (formData.get('description').length < 10) {
            invDesc = true;
            alert('Description must be more than 10 symbols');
        }

        if (formData.get('price') < 0) {
            invPrice = true;
            alert('Price must be a positive number');
        }

        if (formData.get('img') == '') {
            invImg = true;
            alert('Image URL is required');
        }

        ctx.render(createTemplate(submit, invMake, invModel, invYear, invDesc, invPrice, invImg));

        if (invMake == false && invModel == false && invYear == false && invDesc == false && invPrice == false && invImg == false) {
            data.year = Number(data.year);
            data.price = Number(data.price);
            await createItem(data);
            ctx.page.redirect('/');
        }
    }
}
