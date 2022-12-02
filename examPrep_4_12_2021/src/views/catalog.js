
import { getAllItems } from '../api/data.js';
import { html, nothing } from '../lib.js';

const catalogTemplate = (items, user) => html `
        <section id="catalogPage">
            <h1>All Albums</h1>

        ${!!items && items.length > 0 ? html `
        ${items.map(i => createItemCard(i, user))}
        ` : html `
            <p>No Albums in Catalog!</p>
        `}           

        </section>
`;

const createItemCard = (item, user) => html `
            <div class="card-box">
                <img src="${item.imgUrl}">
                <div>
                    <div class="text-center">
                        <p class="name">Name: ${item.name}</p>
                        <p class="artist">Artist: ${item.artist}</p>
                        <p class="genre">Genre: ${item.genre}</p>
                        <p class="price">Price: ${item.price}</p>
                        <p class="date">Release Date: ${item.releaseDate}</p>
                    </div>

                    ${!!user ? html `
                    <div class="btn-group">
                        <a href="/catalog/${item._id}" id="details">Details</a>
                    </div>` : nothing}
                   
                </div>
            </div>
`;


export async function showCatalog (ctx) {

    let user;

    if (ctx.user) {

        user = ctx.user;

    }

    const items = await getAllItems();

    ctx.render(catalogTemplate(items, user));

}

