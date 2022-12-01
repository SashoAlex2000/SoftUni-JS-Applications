
import { deleteItem, getItemById } from '../api/data.js';
import { html, nothing } from '../lib.js';
import { createSubmitHandler } from '../util.js';

const detailsTemplate = (currentItem, canModify, onDelete) => html `

        <section id="meme-details">
            <h1>Meme Title: ${currentItem.title}

            </h1>
            <div class="meme-details">
                <div class="meme-img">
                    <img alt="meme-alt" src="${currentItem.imageUrl}">
                </div>
                <div class="meme-description">
                    <h2>Meme Description</h2>
                    <p>
                        ${currentItem.description}
                    </p>
                    ${canModify ? html `
                    <a class="button warning" href="/edit/${currentItem._id}">Edit</a>
                    <button @click=${onDelete} class="button danger">Delete</button>
                    ` : nothing}
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
            ctx.page.redirect('/memes')

        }

    }

}
