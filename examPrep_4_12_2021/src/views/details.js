
import { deleteItem, getItemById } from '../api/data.js';
import { html, nothing } from '../lib.js';
import { createSubmitHandler } from '../util.js';

const detailsTemplate = (currentItem, canModify, onDelete) => html `

    
<section id="detailsPage">
    <div class="wrapper">
        <div class="albumCover">
            <img src="${currentItem.imgUrl}">
        </div>
        <div class="albumInfo">
            <div class="albumText">

                <h1>Name: ${currentItem.name}</h1>
                <h3>Artist: ${currentItem.artist}</h3>
                <h4>Genre: ${currentItem.genre}</h4>
                <h4>Price: $${currentItem.price}</h4>
                <h4>Date: ${currentItem.releaseDate}</h4>
                <p>Description: ${currentItem.description}</p>
            </div>

            ${canModify ? html `
            <div class="actionBtn">
                <a href="/edit/${currentItem._id}" class="edit">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>
            </div>` : nothing}
        </div>
    </div>
</section>
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
            ctx.page.redirect('/catalog')

        }

    }

}
