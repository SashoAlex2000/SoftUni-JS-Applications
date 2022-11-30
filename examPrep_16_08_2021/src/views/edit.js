import { getGameById, updateGame } from '../api/data.js';
import { html } from '../lib.js';
import { createSubmitHandler } from '../util.js';


const editTemplate = (oldData, onEdit) => html `
<section id="edit-page" class="auth">
<form @submit=${onEdit} id="edit">
    <div class="container">

        <h1>Edit Game</h1>
        <label for="leg-title">Legendary title:</label>
        <input type="text" id="title" name="title" .value="${oldData.title}">

        <label for="category">Category:</label>
        <input type="text" id="category" name="category" .value="${oldData.category}">

        <label for="levels">MaxLevel:</label>
        <input type="number" id="maxLevel" name="maxLevel" min="1" .value="${oldData.maxLevel}">

        <label for="game-img">Image:</label>
        <input type="text" id="imageUrl" name="imageUrl" .value="${oldData.imageUrl}">

        <label for="summary">Summary:</label>
        <textarea name="summary" id="summary" .value="${oldData.summary}"></textarea>
        <input class="btn submit" type="submit" value="Edit Game">

    </div>
</form>
</section>
`;


export async function showEdit (ctx) {

    const id = ctx.params.id;

    const oldData = await getGameById(id);
    console.log(oldData);

    ctx.render(editTemplate(oldData, createSubmitHandler(onEdit)));

    async function onEdit({title, category, maxLevel, imageUrl, summary}) {

        if ([title, category, maxLevel, imageUrl, summary].some(s => s == '')) {
            alert('All fields are required for adding a new shoe pair!!!');
            return;
        }

        await updateGame(id, {title, category, maxLevel, imageUrl, summary});
        ctx.page.redirect(`/games/${id}`);

    }

}

