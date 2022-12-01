
import { getAllItems } from '../api/data.js';
import { html } from '../lib.js';

const gamesTemplate = (items) => html`


<!-- All Memes Page ( for Guests and Users )-->
<section id="meme-feed">
    <h1>All Memes</h1>
    <div id="memes">
        ${!!items && items.length > 0 ? html`
    ${items.map(i => createItemCard(i))}
    ` : html`
    <p class="no-memes">No memes in database.</p>
    `}


        <!-- Display : If there are no memes in database -->
        
    </div>
</section>
`;

const createItemCard = (item) => html`
        <div class="meme">
            <div class="card">
                <div class="info">
                    <p class="meme-title">${item.title}</p>
                    <img class="meme-image" alt="meme-img" src="${item.imageUrl}">
                </div>
                <div id="data-buttons">
                    <a class="button" href="/memes/${item._id}">Details</a>
                </div>
            </div>
        </div>
`;


export async function showCatalog(ctx) {

    const items = await getAllItems();

    ctx.render(gamesTemplate(items));

}

