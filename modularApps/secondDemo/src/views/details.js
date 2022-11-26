// import { html } from "../../node_modules/lit-html/lit-html.js";
import { html, until } from "../lib.js";

import { getByID } from "../data/recipes.js";
// import { nothing } from "lit-html";
import '../data/likers.js'
import { getLikesByRecipeID, likeRecipe } from "../data/likers.js";

const asyncTemplate = (recipePromise) => html`
<h2>LOADED FROM ASYNC TEMPLATE</h2>
${until(recipePromise, recipeSkeleton())}
`


const detailsTemplate = (recipe, canLike, likes, onLike) => html `
<h2>${recipe.name} </h2>
<div>
    ${canLike ? html`<a href="javascript:void(0)" @click=${onLike}>Like</a>` : ''}
    ${likes} like${likes == 1 ? '' : 's'}
</div>
<img src="${'/' + recipe.img}">
<h3>Ingredients</h3>
<ul>
    ${recipe.ingredients.map(i => html `<li>${i}</li>`)}
</ul>
<h3>Steps</h3>
<ul>
    ${recipe.steps.map(s => html `<li>${s}</li>`)}
</ul>
`

const recipeSkeleton = () => html `
<h2>Recipe NAME</h2>
<h3>Ingredients</h3>
<ul>
    Loading &hellip;
</ul>
<h3>Steps</h3>
<ul>
    Loading &hellip;
</ul>
`

export function showDetails (ctx) {
    console.log(ctx.params.productID)
    const id = ctx.params.productID;
    const user = ctx.user;

    let userId;
    if (user) {
        userId = user._id;
    }

    // ctx.render(until(loadRecipe(id), recipeSkeleton()));    
    ctx.render(asyncTemplate(loadRecipe(id, userId, onLike)));    

    async function onLike () {

        await likeRecipe(id);
        ctx.page.redirect('/recipes/' + id);

    }

}

async function loadRecipe (id, userId, onLike) {

    const {likes, canLike} = await getLikesByRecipeID(id, userId);
    const recipe = await getByID(id);
    const isOwner = recipe._ownerId == userId;
    return detailsTemplate(recipe, canLike && !isOwner, likes, onLike);

} 

