
import { deleteItem, getItemById } from '../api/data.js';
import { getAllLIkes, getCurrentUserLikes, likePost } from '../api/likes.js';
import { html, nothing } from '../lib.js';
import { createSubmitHandler } from '../util.js';

const detailsTemplate = (currentItem, canModify, totalLikes, canCurrentUserLike, onDelete, onLike) => html `
<section id="details-page" class="details">
<div class="book-information">
    <h3>${currentItem.title}</h3>
    <p class="type">Type: ${currentItem.type}</p>
    <p class="img"><img src="${currentItem.imageUrl}"></p>
    ${canModify ? html `
    <div class="actions">
        <!-- Edit/Delete buttons ( Only for creator of this book )  -->
        <a class="button" href="/edit/${currentItem._id}">Edit</a>
        <a @click=${onDelete} class="button" href="javascript:void(0)">Delete</a>
    </div>
    ` : nothing}

    ${canCurrentUserLike ? html `<a @click=${onLike} class="button" href="javascript:void(0)">Like</a>` : nothing}

    <!-- ( for Guests and Users )  -->
    <div class="likes">
        <img class="hearts" src="/images/heart.png">
        <span id="total-likes">Likes: ${totalLikes}</span>
    </div>

</div>
<div class="book-description">
    <h3>Description:</h3>
    <p>${currentItem.description}</p>
</div>
</section>
`;


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

    const totalLikes = await getAllLIkes(id);

    let canCurrentLike;

    if (userId) {
        canCurrentLike = await getCurrentUserLikes(id, userId) == 0;
    }

    const canCurrentUserLike = !!userId && canCurrentLike && userId != currentItem._ownerId;

    ctx.render(detailsTemplate(currentItem, canModify,totalLikes, canCurrentUserLike, onDelete, onLike));

    async function onDelete () {

        const choice = confirm('Are you sure?');

        if (choice) {

            await deleteItem(id);
            ctx.page.redirect('/')

        }

    }

    async function onLike () {

        await likePost(id)
        ctx.page.redirect(`/dashboard/${id}`)

    }

}
