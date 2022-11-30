
import { getAllGames } from '../api/data.js';
import { html } from '../lib.js';

const gamesTemplate = (games) => html `
<section id="catalog-page">
<h1>All Games</h1>
${!!games && games.length > 0 ? html `
    ${games.map(g => createGameCard(g))}
` : html `
    <h3 class="no-articles">No articles yet</h3>
`}
</section>
`;

const createGameCard = (game) => html `
<div class="allGames">
    <div class="allGames-info">
        <img src="${game.imageUrl}">
        <h6>${game.category}</h6>
        <h2>${game.title}</h2>
        <a href="/games/${game._id}" class="details-button">Details</a>
    </div>
</div>
`


export async function showGames (ctx) {

    const games = await getAllGames();

    ctx.render(gamesTemplate(games));

}

