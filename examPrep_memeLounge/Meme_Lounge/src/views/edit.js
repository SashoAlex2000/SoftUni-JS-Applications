import { getItemById, updateItem } from '../api/data.js';
import { html } from '../lib.js';
import { createSubmitHandler } from '../util.js';


const editTemplate = (oldData, onEdit) => html `
        <section id="edit-meme">
            <form @submit=${onEdit} id="edit-form">
                <h1>Edit Meme</h1>
                <div class="container">
                    <label for="title">Title</label>
                    <input id="title" type="text" placeholder="Enter Title" name="title" .value=${oldData.title}>
                    <label for="description">Description</label>
                    <textarea id="description" placeholder="Enter Description" name="description" .value=${oldData.description}>
                            Programming is often touted as a smart and lucrative career path.
                            It's a job that (sometimes) offers flexibility and great benefits.
                            But it's far from sunshine and Nyan Cat rainbows. The hours are long.
                            The mistakes are frustrating. And your eyesight is almost guaranteed to suffer.
                            These memes cover most of the frustration (and funny moments) of programming.
                            At least we can laugh through the pain. 
                        </textarea>
                    <label for="imageUrl">Image Url</label>
                    <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" .value=${oldData.imageUrl}>
                    <input type="submit" class="registerbtn button" value="Edit Meme">
                </div>
            </form>
        </section>
`;


export async function showEdit (ctx) {

    const id = ctx.params.id;

    const oldData = await getItemById(id);
    console.log(oldData);

    ctx.render(editTemplate(oldData, createSubmitHandler(onEdit)));

    async function onEdit({title, description, imageUrl}) {

        if ([title, description, imageUrl].some(s => s == '')) {
            alert('All fields are required for adding a new shoe pair!!!');
            return;
        }

        await updateItem(id, {title, description, imageUrl});
        ctx.page.redirect(`/memes`);

    }

}

