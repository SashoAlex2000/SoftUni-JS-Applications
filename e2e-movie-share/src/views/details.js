
import { getSpecificComments, postComment } from "../data/comments.js";
import { getMovieById } from "../data/movie.js";
import { html } from "../lib/lit-html.js";
import { createSubmiteHandler } from "../util.js";
import { repeat } from '../lib/directives/repeat.js'

const detailTemplate = (onComment, movie, currentComments) => html`
    <h1>${movie.name}</h1>
    <h3>${movie.year}</h3>
    <h3>${movie.rating}</h3>
    <p>${movie.description}</p>
    <br>

    <form @submit="${onComment}">
        <input name="commentText" placeholder="Enter your comment"></input>
        <button>Comment!</button>
    </form>

    ${currentComments.length > 0 ?
        html`
        <ul>
            ${repeat(currentComments, c=>c.objectId, commentCard)}
        </ul>
        `
        : 
        html`No comments yet!`}

`;

const commentCard = (comment) => html `
<li>${comment.commentText}</li> 
`;


export async function showDetails(ctx) {

    console.log(ctx.params);
    const id = ctx.params.id;
    const movie = await getMovieById(id);
    console.log(movie);

    const result = await getSpecificComments(id);
    const currentComments = result.results;
    console.log(currentComments);

    ctx.render(detailTemplate(createSubmiteHandler(onCommentCreate), movie, currentComments));

    async function onCommentCreate({ commentText }) {

        if (commentText == '') {
            return alert('Cannot submit empty comment :(')
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

}

