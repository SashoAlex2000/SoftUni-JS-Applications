import { getItemById, updateItem } from '../api/data.js';
import { html } from '../lib.js';
import { createSubmitHandler } from '../util.js';


const editTemplate = (oldData, onEdit) => html `
<section id="edit-page" class="edit">
            <form @submit=${onEdit}id="edit-form" action="javascript:void(0)" method="">
                <fieldset>
                    <legend>Edit my Book</legend>
                    <p class="field">
                        <label for="title">Title</label>
                        <span class="input">
                            <input type="text" name="title" id="title" .value="${oldData.title}">
                        </span>
                    </p>
                    <p class="field">
                        <label for="description">Description</label>
                        <span class="input">
                            <textarea name="description" id="description" .value=${oldData.description}></textarea>
                        </span>
                    </p>
                    <p class="field">
                        <label for="image">Image</label>
                        <span class="input">
                            <input type="text" name="imageUrl" id="image" .value="${oldData.imageUrl}">
                        </span>
                    </p>
                    <p class="field">
                        <label for="type">Type</label>
                        <span class="input">
                            <select id="type" name="type" selected="${oldData.type}">
                                <option value="Fiction">Fiction</option>
                                <option value="Romance">Romance</option>
                                <option value="Mistery">Mistery</option>
                                <option value="Classic">Clasic</option>
                                <option value="Other">Other</option>
                            </select>
                        </span>
                    </p>
                    <input class="button submit" type="submit" value="Save">
                </fieldset>
            </form>
        </section>
`;


export async function showEdit (ctx) {

    const id = ctx.params.id;

    const oldData = await getItemById(id);
    console.log(oldData);

    ctx.render(editTemplate(oldData, createSubmitHandler(onEdit)));

    async function onEdit({title, description, imageUrl, type}) {

        if ([title, description, imageUrl, type].some(s => s == '')) {
            alert('All fields are required for editing the book!');
            return;
        }

        await updateItem(id, {title, description, imageUrl, type});
        ctx.page.redirect(`/`);

    }

}

