
import { getSpecificComments, postComment } from "../data/comments.js";
import { getMovieById } from "../data/movie.js";
import { html } from "../lib/lit-html.js";
import { createRatingObject, createSubmiteHandler } from "../util.js";
import { repeat } from '../lib/directives/repeat.js'
import { classMap } from '../lib/directives/class-map.js'
import { getMovieRatingsById, postRating } from "../data/movieRating.js";

const detailTemplate = (onComment, onRate, movie, currentComments, ratingObject) => html`
    <h1>${movie.name}</h1>
    <h3>${movie.year}</h3>
    <h3>${movie.rating}</h3>
    <p>${movie.description}</p>
    <p>Movie Rating: ${ratingObject.average} / 5 (${ratingObject.length})</p>
    <br>

    <form @submit=${onRate}>
        <label for="rating">Rate this movie</label>

        <select id="rating" name="rating">
            <option calue="1">1</option>
            <option calue="2">2</option>
            <option calue="3">3</option>
            <option calue="4">4</option>
            <option calue="5">5</option>
        </select>

        ${ratingObject.hasRated ? html `
        <button disabled>Unrate</button>
        ` : html `
        <button>rate this</button>
        `}
        
    </form>
    <br>

    <form @submit="${onComment}">
        <input name="commentText" placeholder="Enter your comment"></input>
        <button>Comment!</button>
    </form>

    ${currentComments.length > 0 ?
        html`
        <ul>
            ${repeat(currentComments, c => c.objectId, commentCard)}
        </ul>
        `
        :
        html`No comments yet!`}

`;

const commentCard = (comment) => html`
<li class=${classMap({ 'owner-comment': comment.isOwnerOfMovie })}>
    ${comment.owner.username}: ${comment.commentText}
</li> 
`;


export async function showDetails(ctx) {

    console.log(ctx.params);
    const id = ctx.params.id;
    const movie = await getMovieById(id);
    console.log(movie);

    const result = await getSpecificComments(id);
    const currentComments = result.results;
    console.log(currentComments);

    currentComments.map(c => c.isOwnerOfMovie = Boolean(c.owner.objectId == movie.owner.objectId));

    console.log(currentComments);
    console.log(ctx.user);

    let allRatings = await getMovieRatingsById(id);
    allRatings = allRatings.results;
    console.log(allRatings);

    const ratingObject = createRatingObject(allRatings, ctx.user?.objectId);

    ctx.render(detailTemplate(createSubmiteHandler(onCommentCreate), createSubmiteHandler(onRate),
    movie, currentComments, ratingObject));

    async function onCommentCreate({ commentText }) {

        if (commentText == '') {
            return alert('Cannot submit empty comment :(')
        }

        if (!ctx.user) {
            return alert("You have to be logged in to post a comment!")
        }

        console.log(ctx.user);
        const currentUserId = ctx.user?.objectId;
        console.log(commentText);

        const commentData = {
            commentText,
        }

        console.log(commentData);

        await postComment(commentData, currentUserId, id);

        ctx.page.redirect(`/catalog/${id}`);

    }

    async function onRate({ rating }) {

        const ratingData = {
            rating: Number(rating),
        }

        await postRating(ratingData, id, ctx.user.objectId);
    }

}

