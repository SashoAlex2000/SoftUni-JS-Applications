
import { getAllItems } from '../api/data.js';
import { html } from '../lib.js';

const gamesTemplate = (items) => html `
<!-- BASE -->
<section id="dashboard-page" class="dashboard">
<h1>Dashboard</h1>
${!!items && items.length > 0 ? html `
    <ul class="other-books-list">
        ${items.map(i => createItemCard(i))}
    </ul>
` : html `
    <p class="no-books">No books in database!</p>
`}
</section>
`;

const createItemCard = (item) => html `
<li class="otherBooks">
    <h3>${item.title}</h3>
    <p>Type: ${item.type}</p>
    <p class="img"><img src="${item.imageUrl}"></p>
    <a class="button" href="/dashboard/${item._id}">Details</a>
</li>
`


export async function showCatalog (ctx) {

    const items = await getAllItems();

    ctx.render(gamesTemplate(items));

}

