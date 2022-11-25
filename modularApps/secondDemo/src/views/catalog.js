import { html } from "../../node_modules/lit-html/lit-html.js";
import { repeat } from '../../node_modules/lit-html/directives/repeat.js'
import { getAll } from "../data/recipes.js";
import { createSubmitHandler } from "../data/util.js";

const catalogTemplate = (recipes, page, pages, search, onSumbit) => html `
    <h2>This is the catalog page! (from views folder) </h2>
    <div>
        <form @submit=${onSumbit}>
        <input name="search" type="text" .value=${search}>
        <button>Search</button>
        </form>
    </div>
    <div>
    ${page > 1 ? html `<a href="${composeURL(page-1, search)}">&lt;Prev</a>`:``}
    <span>Page: ${page} / ${pages}</span>
    ${page < pages ? html`<a href="${composeURL(page+1, search)}">Next&gt;</a>`: ''}
    </div>
    <ul>
        ${repeat(recipes, r => r._id, recipeCardTemplate)}
    </ul>
`;


const recipeCardTemplate = (recipe) => html`
<li><a href="${`/recipes/${recipe._id}`}">${recipe.name}</a></li>
`

function composeURL(page, search) {
    let url = `?page=${page}`;
    if (search) {
        url += `&search=` + search;
    }
    return url;

}

export async function showCatalog (ctx) {
    console.log(ctx)
    const page = Number(ctx.query.page) || 1;
    const search = ctx.query.search || '';
    ctx.render(html `<p>LOADING &hellip; </p>`)
    const {data:recipes, pages} = await getAll(page, search);
    ctx.render(catalogTemplate(recipes, page, pages, search, createSubmitHandler(onSumbit)));

    function onSumbit(data, form) {
        console.log('redirected from form')
        ctx.page.redirect(`/recipes?search=` + data.search);
        //it didnt work without / before recipes, it was redirecting  to product details 
    }

}

