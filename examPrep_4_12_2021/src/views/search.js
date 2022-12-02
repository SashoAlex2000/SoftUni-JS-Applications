
import { get } from '../api/api.js';
import { html, nothing } from '../lib.js';

const searchTemplate = (songs, user, onSearch) => html `
        <section id="searchPage">
            <h1>Search by Name</h1>

            <div class="search">
                <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
                <button @click=${onSearch} class="button-list">Search</button>
            </div>

            <h2>Results:</h2>
            <div class="search-result">
            ${!!songs && songs.length > 0 ? html `
            ${songs.map(s => createSongCard(s, user))}
            ` : html `
            <p class="no-result">No result.</p>
            `}
            </div>
        </section>
`;

const createSongCard = (song, user) => html `
                <div class="card-box">
                    <img src="${song.imgUrl}">
                    <div>
                        <div class="text-center">
                            <p class="name">Name: ${song.name}</p>
                            <p class="artist">Artist: ${song}</p>
                            <p class="genre">Genre: ${song.genre}</p>
                            <p class="price">Price: ${song.price}</p>
                            <p class="date">Release Date: ${song.releaseDate}</p>
                        </div>
                        ${user ? html `
                        <div class="btn-group">
                            <a href="/catalog/${song._id}" id="details">Details</a>
                        </div>` : nothing}

                    </div>
                </div>
`


export async function showSearch (ctx) {

    console.log(ctx.query.search);
    const queryString = ctx.query.search
    let songsFound;
    const user = !!ctx.user;
    console.log(user)

    if (queryString) {
        const response = await get(`/data/albums?where=name%20LIKE%20%22${encodeURIComponent(queryString)}%22`);
        // const response = await get(`/data/albums?where=name%20LIKE%20%22Melodrama%22`);
        console.log('the response is ')
        console.log(response);
        songsFound = response;
        console.log(songsFound);
    }

    ctx.render(searchTemplate(songsFound, user, onSearch));

    async function onSearch(event) {
        // const searchedShoew = await get(`/data/shoes?where=brand%20LIKE%20%22${name}%22`);
        // ctx.page.redirect(`/search?search=${search}`);

        console.log('searching???')
        console.log(event.target.parentElement)

        const searchedWord = event.target.parentElement.querySelector('input');
        console.log(searchedWord.value);
        ctx.page.redirect(`/search/?search=${searchedWord.value}`)

    }

}
