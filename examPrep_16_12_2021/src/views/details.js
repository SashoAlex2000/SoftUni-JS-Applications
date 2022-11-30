
import { deleteItem, getItemById } from '../api/data.js';
import { html, nothing } from '../lib.js';
import { createSubmitHandler } from '../util.js';

const detailsTemplate = (currentItem, canModify, onDelete) => html `
<section id="detailsPage">
<div id="detailsBox">
    <div class="detailsInfo">
        <h1>Title: ${currentItem.title}</h1>
        <div>
            <img src="${currentItem.imageUrl}" />
        </div>
    </div>

    <div class="details">
        <h3>Theater Description</h3>
        <p>${currentItem.description}</p>
        <h4>Date: ${currentItem.date}</h4>
        <h4>Author: ${currentItem.author}</h4>
        <div class="buttons">
            ${canModify ? html `
            <a @click=${onDelete} class="btn-delete" href="javascript:void(0)">Delete</a>
            <a class="btn-edit" href="/edit/${currentItem._id}">Edit</a>
            ` : nothing}
        </div>
        <p class="likes">Likes: 0</p>
    </div>
</div>
</section>
    ${canModify ? html `` : html ``}

`;

const createItemCard = (item) => html `

`

export async function showDetails (ctx) {

    const id = ctx.params.id;
    let userId;
    const currentItem = await getItemById(id);

    if (ctx.user) {
        userId = ctx.user._id
    }

    const canModify = !!userId && currentItem._ownerId == userId;
    console.log(canModify)
    console.log(userId)

    ctx.render(detailsTemplate(currentItem, canModify, onDelete));

    async function onDelete () {

        const choice = confirm('Are you sure?');

        if (choice) {

            await deleteItem(id);
            ctx.page.redirect('/')

        }

    }

}
