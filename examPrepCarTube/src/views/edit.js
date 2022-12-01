
import { getItemById, updateItem } from '../api/data.js';
import { html } from '../lib.js'
import { createSubmitHandler } from '../util.js';

const editTemplate = (currentCar, onEdit) => html `
        <section id="edit-listing">
            <div class="container">

                <form @submit=${onEdit} id="edit-form">
                    <h1>Edit Car Listing</h1>
                    <p>Please fill in this form to edit an listing.</p>
                    <hr>

                    <p>Car Brand</p>
                    <input type="text" placeholder="Enter Car Brand" name="brand" .value="${currentCar.brand}">

                    <p>Car Model</p>
                    <input type="text" placeholder="Enter Car Model" name="model" .value="${currentCar.model}">

                    <p>Description</p>
                    <input type="text" placeholder="Enter Description" name="description" .value="${currentCar.description}">

                    <p>Car Year</p>
                    <input type="number" placeholder="Enter Car Year" name="year" .value="${currentCar.year}">

                    <p>Car Image</p>
                    <input type="text" placeholder="Enter Car Image" name="imageUrl" .value="${currentCar.imageUrl}">

                    <p>Car Price</p>
                    <input type="number" placeholder="Enter Car Price" name="price" .value="${currentCar.price}">

                    <hr>
                    <input type="submit" class="registerbtn" value="Edit Listing">
                </form>
            </div>
        </section>
`;

export async function showEdit (ctx) {

    const id = ctx.params.id;
    const currentCar = await getItemById(id);

    ctx.render(editTemplate(currentCar, createSubmitHandler(onEdit)));

    async function onEdit ({brand, model, description, year, imageUrl, price}) {

        if ([brand, model, description, year, imageUrl, price].some(s => s == '')) {

            window.alert('You have to fill in all the fields in order to create a new entry!!!');
            return;

        }

        if (year < 0 || price < 0) {
            window.alert('Price and year can be positive integers only!!!');
            return;
        }

        await updateItem(id, {brand, model, description, year, imageUrl, price});
        ctx.page.redirect(`/catalog/${id}`)

    }

}
