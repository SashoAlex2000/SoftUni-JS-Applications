// import { html } from "../../node_modules/lit-html/lit-html.js";
import { html, until } from "../lib.js";

import { getByID } from "../data/recipes.js";

const asyncTemplate = (recipePromise) => html`
<h2>LOADED FROM ASYNC TEMPLATE</h2>
${until(recipePromise, recipeSkeleton())}
`


const detailsTemplate = (recipe) => html `
<h2>${recipe.name} </h2>
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

    // ctx.render(until(loadRecipe(id), recipeSkeleton()));    
    ctx.render(asyncTemplate(loadRecipe(id)));    

}

async function loadRecipe (id) {

    const recipe = await getByID(id);
    return detailsTemplate(recipe);

} 

