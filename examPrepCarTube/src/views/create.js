
import { createItem } from '../api/data.js';
import { html } from '../lib.js'
import { createSubmitHandler } from '../util.js';


const createTemplate = (onCreate) => html `
<section id="create-listing">
<div class="container">
    <form @submit=${onCreate} id="create-form">
        <h1>Create Car Listing</h1>
        <p>Please fill in this form to create an listing.</p>
        <hr>

        <p>Car Brand</p>
        <input type="text" placeholder="Enter Car Brand" name="brand">

        <p>Car Model</p>
        <input type="text" placeholder="Enter Car Model" name="model">

        <p>Description</p>
        <input type="text" placeholder="Enter Description" name="description">

        <p>Car Year</p>
        <input type="number" placeholder="Enter Car Year" name="year">

        <p>Car Image</p>
        <input type="text" placeholder="Enter Car Image" name="imageUrl">

        <p>Car Price</p>
        <input type="number" placeholder="Enter Car Price" name="price">

        <hr>
        <input type="submit" class="registerbtn" value="Create Listing">
    </form>
</div>
</section>
`;


export async function showCreate (ctx) {

    ctx.render(createTemplate(createSubmitHandler(onCreate)));

    async function onCreate ({brand, model, description, year, imageUrl, price}) {

        if ([brand, model, description, year, imageUrl, price].some(s => s == '')) {

            window.alert('You have to fill in all the fields in order to create a new entry!!!');
            return;

        }

        if (year < 0 || price < 0) {
            window.alert('Price and year can be positive integers only!!!');
            return;
        }

        await createItem({brand, model, description, year, imageUrl, price});
        ctx.page.redirect('/catalog')

    }

}
