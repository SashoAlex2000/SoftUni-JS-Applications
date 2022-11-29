
import { getItemById, updateListing } from '../api/data.js';
import { html } from '../lib.js'
import { createSubmitHandler } from '../util.js';

const editTemplate = (currentItem, onEdit) => html `
        <section id="edit-page" class="auth">
            <form @submit=${onEdit} id="edit">
                <h1 class="title">Edit Post</h1>

                <article class="input-group">
                    <label for="title">Post Title</label>
                    <input type="title" name="title" id="title" .value=${currentItem.title}>
                </article>

                <article class="input-group">
                    <label for="description">Description of the needs </label>
                    <input type="text" name="description" id="description" .value="${currentItem.description}">
                </article>

                <article class="input-group">
                    <label for="imageUrl"> Needed materials image </label>
                    <input type="text" name="imageUrl" id="imageUrl" .value="${currentItem.imageUrl}">
                </article>

                <article class="input-group">
                    <label for="address">Address of the orphanage</label>
                    <input type="text" name="address" id="address" .value="${currentItem.address}">
                </article>

                <article class="input-group">
                    <label for="phone">Phone number of orphanage employee</label>
                    <input type="text" name="phone" id="phone" .value="${currentItem.phone}">
                </article>

                <input type="submit" class="btn submit" value="Edit Post">
            </form>
        </section>
`;


export async function showEdit (ctx) {

    const id = ctx.params.id;
    const currentItem = await getItemById(id);
    console.log(currentItem)

    ctx.render(editTemplate(currentItem, createSubmitHandler(onEdit)));

    async function onEdit ({title, description, imageUrl, address, phone}) {

        if ([title, description, imageUrl, address, phone].some(s => s == '')) {
            alert('Please fill in all fields in order to a new page!');
            return;
        }

        await updateListing(id, {title, description, imageUrl, address, phone});
        ctx.page.redirect('/')

    }

    

}
