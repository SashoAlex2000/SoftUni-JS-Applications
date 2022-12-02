import { getItemById, updateItem } from '../api/data.js';
import { html } from '../lib.js';
import { createSubmitHandler } from '../util.js';


const editTemplate = (oldData, onEdit) => html `
        <section class="editPage">
            <form @submit=${onEdit}>
                <fieldset>
                    <legend>Edit Album</legend>

                    <div class="container">
                        <label for="name" class="vhide">Album name</label>
                        <input id="name" name="name" class="name" type="text" .value=${oldData.name}>

                        <label for="imgUrl" class="vhide">Image Url</label>
                        <input id="imgUrl" name="imgUrl" class="imgUrl" type="text" .value=${oldData.imgUrl}>

                        <label for="price" class="vhide">Price</label>
                        <input id="price" name="price" class="price" type="text" .value=${oldData.price}>

                        <label for="releaseDate" class="vhide">Release date</label>
                        <input id="releaseDate" name="releaseDate" class="releaseDate" type="text" .value=${oldData.releaseDate}>

                        <label for="artist" class="vhide">Artist</label>
                        <input id="artist" name="artist" class="artist" type="text" .value=${oldData.artist}>

                        <label for="genre" class="vhide">Genre</label>
                        <input id="genre" name="genre" class="genre" type="text" .value=${oldData.genre}>

                        <label for="description" class="vhide">Description</label>
                        <textarea name="description" class="description" rows="10"
                            cols="10">${oldData.description}</textarea>

                        <button class="edit-album" type="submit">Edit Album</button>
                    </div>
                </fieldset>
            </form>
        </section>
`;


export async function showEdit (ctx) {

    const id = ctx.params.id;

    const oldData = await getItemById(id);
    console.log(oldData);

    ctx.render(editTemplate(oldData, createSubmitHandler(onEdit)));

    async function onEdit({name, imgUrl, price, releaseDate, artist, genre, description}) {

        if ([name, imgUrl, price, releaseDate, artist, genre, description].some(s => s == '')) {
            alert('All fields are required for editing an item!!!');
            return;
        }

        await updateItem(id, {name, imgUrl, price, releaseDate, artist, genre, description});
        ctx.page.redirect(`/catalog/${id}`);

    }

}

