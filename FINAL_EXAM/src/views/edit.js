import { getItemById, updateItem } from '../api/data.js';
import { html } from '../lib.js';
import { createSubmitHandler } from '../util.js';


const editTemplate = (oldData, onEdit) => html `
      <section id="edit">
        <div class="form">
          <h2>Edit Album</h2>
          <form @submit=${onEdit} class="edit-form">
            <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" .value=${oldData.singer} />
            <input type="text" name="album" id="album-album" placeholder="Album" .value=${oldData.album} />
            <input type="text" name="imageUrl" id="album-img" placeholder="Image url" .value=${oldData.imageUrl} />
            <input type="text" name="release" id="album-release" placeholder="Release date" .value=${oldData.release} />
            <input type="text" name="label" id="album-label" placeholder="Label" .value=${oldData.label} />
            <input type="text" name="sales" id="album-sales" placeholder="Sales" .value=${oldData.sales} />

            <button type="submit">post</button>
          </form>
        </div>
      </section>
`;


export async function showEdit (ctx) {

    const id = ctx.params.id;

    const oldData = await getItemById(id);
    console.log(oldData);

    ctx.render(editTemplate(oldData, createSubmitHandler(onEdit)));

    async function onEdit({singer, album, imageUrl, release, label, sales}) {

        if ([singer, album, imageUrl, release, label, sales].some(s => s == '')) {
            alert('All fields are required for editing an item!!!');
            return;
        }

        await updateItem(id, {singer, album, imageUrl, release, label, sales});
        ctx.page.redirect(`/catalog/${id}`);

    }

}

