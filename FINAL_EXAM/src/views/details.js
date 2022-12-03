
import { deleteItem, getAllItems, getItemById } from '../api/data.js';
import { getAllLikes, hasCUrrentUserLiked, likeAlbum } from '../api/likes.js';
import { html, nothing } from '../lib.js';
import { createSubmitHandler } from '../util.js';

const detailsTemplate = (currentItem, canModify,canLike, allLikes, onDelete, onLike) => html `


    <section id="details">
    <div id="details-wrapper">
      <p id="details-title">Album Details</p>
      <div id="img-wrapper">
        <img src="${currentItem.imageUrl}" alt="example1" />
      </div>
      <div id="info-wrapper">
        <p><strong>Band:</strong><span id="details-singer">${currentItem.singer}</span></p>
        <p>
          <strong>Album name:</strong><span id="details-album">${currentItem.album}</span>
        </p>
        <p><strong>Release date:</strong><span id="details-release">${currentItem.release}</span></p>
        <p><strong>Label:</strong><span id="details-label">${currentItem.label}</span></p>
        <p><strong>Sales:</strong><span id="details-sales">${currentItem.sales}</span></p>
      </div>
      <div id="likes">Likes: <span id="likes-count">${allLikes}</span></div>

        ${canModify ? html `
        <div id="action-buttons">
          
          <a href="/edit/${currentItem._id}" id="edit-btn">Edit</a>
          <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
        </div>` : nothing}
        ${canLike ? html `<div id="action-buttons">
        <a @click=${onLike} href="javascript:void(0)" id="like-btn">Like</a>
      </div>` : nothing}

    </div>
  </section>

`;


// <a href="" id="like-btn">Like</a>
// <div id="likes">Likes: <span id="likes-count">0</span></div>

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

    // like functionality
    let hasCurrentLiked
    if (userId) {
        hasCurrentLiked = await hasCUrrentUserLiked(id, userId);
    }
    console.log(hasCurrentLiked);

    const canLike = !!userId && !canModify && hasCurrentLiked == 0;
    const allLikes = await getAllLikes(id);

    ctx.render(detailsTemplate(currentItem, canModify, canLike, allLikes, onDelete, onLike));

    async function onDelete () {

        const choice = confirm('Are you sure?');

        if (choice) {

            await deleteItem(id);
            ctx.page.redirect('/catalog')

        }

    }

    async function onLike () {

        await likeAlbum(id);
        ctx.page.redirect(`/catalog/${id}`);

    }

}
