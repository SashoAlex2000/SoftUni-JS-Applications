
import { getAllItems } from '../api/data.js';
import { html } from '../lib.js';

const catalogTemplate = (items) => html `

      <section id="dashboard">
        <h2>Albums</h2>

        ${!!items && items.length > 0 ? html `
        <ul class="card-wrapper">
            ${items.map(i => createItemCard(i))}
        </ul>` : html `
        <h2>There are no albums added yet.</h2>`}
      </section>

`;

const createItemCard = (item) => html `
          <li class="card">
            <img src="${item.imageUrl}" alt="travis" />
            <p>
              <strong>Singer/Band: </strong><span class="singer">${item.singer}</span>
            </p>
            <p>
              <strong>Album name: </strong><span class="album">${item.album}</span>
            </p>
            <p><strong>Sales:</strong><span class="sales">${item.sales}</span></p>
            <a class="details-btn" href="/catalog/${item._id}">Details</a>
          </li>
`


export async function showCatalog (ctx) {

    const items = await getAllItems();
    console.log(items);

    ctx.render(catalogTemplate(items));

}

