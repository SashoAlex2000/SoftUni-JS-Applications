import { getItemById, updateItem } from '../api/data.js';
import { html } from '../lib.js';
import { createSubmitHandler } from '../util.js';


const editTemplate = (oldData, onEdit) => html `
        <section @submit=${onEdit} id="editPage">
            <form class="theater-form">
                <h1>Edit Theater</h1>
                <div>
                    <label for="title">Title:</label>
                    <input id="title" name="title" type="text" placeholder="Theater name" .value="${oldData.title}">
                </div>
                <div>
                    <label for="date">Date:</label>
                    <input id="date" name="date" type="text" placeholder="Month Day, Year" .value="${oldData.date}">
                </div>
                <div>
                    <label for="author">Author:</label>
                    <input id="author" name="author" type="text" placeholder="Author"
                        .value="${oldData.author}">
                </div>
                <div>
                    <label for="description">Theater Description:</label>
                    <textarea id="description" name="description"
                        placeholder="Description">${oldData.description}</textarea>
                </div>
                <div>
                    <label for="imageUrl">Image url:</label>
                    <input id="imageUrl" name="imageUrl" type="text" placeholder="Image Url"
                        .value="${oldData.imageUrl}">
                </div>
                <button class="btn" type="submit">Submit</button>
            </form>
        </section>
`;


export async function showEdit (ctx) {

    const id = ctx.params.id;

    const oldData = await getItemById(id);
    console.log(oldData);

    ctx.render(editTemplate(oldData, createSubmitHandler(onEdit)));

    async function onEdit({title, date, author, description, imageUrl}) {

        if ([title, date, author, description, imageUrl].some(s => s == '')) {
            alert('All fields are required for adding a new shoe pair!!!');
            return;
        }

        await updateItem(id, {title, date, author, description, imageUrl});
        ctx.page.redirect(`/catalog`);

    }

}

