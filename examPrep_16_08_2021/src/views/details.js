
import { getAllComments, postComment } from '../api/comments.js';
import { deleteGame, getGameById } from '../api/data.js';
import { html, nothing } from '../lib.js';
import { createSubmitHandler } from '../util.js';

const detailsTemplate = (game, canModify, comments, userId, onDelete, onComment) => html `
<section id="game-details">
<h1>Game Details</h1>
<div class="info-section">

    <div class="game-header">
        <img class="game-img" src="${game.imageUrl}" />
        <h1>${game.title}</h1>
        <span class="levels">MaxLevel: ${game.maxLevel}</span>
        <p class="type">${game.category}</p>
    </div>

    <p class="text">
        ${game.summary}
    </p>

    <!-- #BONUS: all comments -->
    <div class="details-comments">
    <h2>Comments:</h2>

    ${!!comments&&comments.length > 0 ? html `
    <ul>
        ${comments.map(c => createCommentCard(c))}    
    </ul>` : html `<p class="no-comment">No comments.</p>`}

    </div>

    <!-- Edit/Delete buttons ( Only for creator of this game )  -->
    ${canModify ? html `
    <div class="buttons">
        <a href="/edit/${game._id}" class="button">Edit</a>
    <a @click=${onDelete} href="javascript:void(0)" class="button">Delete</a>
    </div>
    ` : html `${!!userId ? html `
    <article class="create-comment">
        <label>Add new comment:</label>
        <form @submit=${onComment} class="form">
            <textarea name="comment" placeholder="Comment......"></textarea>
            <input class="btn submit" type="submit" value="Add Comment">
        </form>
    </article>` : nothing}` }

</div>

</section>
`;

const createCommentCard = (comment) => html `
        <li class="comment">
            <p>Content: ${comment.comment}</p>
        </li>
`

export async function showDetails (ctx) {

    const id = ctx.params.id;
    let userId;
    const game = await getGameById(id);

    if (ctx.user) {
        userId = ctx.user._id
    }

    const canModify = !!userId && game._ownerId == userId;
    console.log(canModify)
    console.log(userId)

    const comments = await getAllComments(id);
    console.log('comments')
    console.log(comments)


    ctx.render(detailsTemplate(game, canModify, comments, userId, onDelete, createSubmitHandler(onComment)));

    async function onDelete () {

        const choice = confirm('Are you sure you want to delete this model?');

        if (choice) {

            await deleteGame(id);
            ctx.page.redirect('/')

        }

    }

    async function onComment ({comment}) {

        await postComment(id, comment);
        ctx.page.redirect(`/games/${id}`)

    }

}
