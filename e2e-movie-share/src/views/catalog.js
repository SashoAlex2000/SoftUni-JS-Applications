
import { html, nothing } from "../lib/lit-html.js";
import { repeat } from '../lib/directives/repeat.js'
import { getAllMovies, getMovieBySearchWord } from "../data/movie.js";
import { movieOptions } from "../util.js";

const catalogTemplate = (movies, onSearch, isSearch, options) => html `
    <div class="search-bar-wrapper">
        <div class="search-div">
            <form class="search-form" @submit=${onSearch}>
                <input placeholder="Your favourite movie goes here ..." class="search-bar">

                </input>
                <button class="meta-search-button search-button">Search</button>
                ${isSearch ? html `
                <a href="/catalog">Clear</a>
                ` : nothing}
            </form>
        </div>
    </div>
    <div class="rating-filter-wrapper">
        <div class="rating-filter">
            <form>
                <label for="rating-filter"> Choose Categories: </label>    
                <select name="rating" id="rating-filter" multiple>
                    ${repeat(options, optionsCard)}
                </select>
                <button type="submit">Filter</button>
            </form>
        </div>    
    </div>
    <div class="movie-wrapper">
        <!-- Throws error with a single item -->
        ${repeat(movies, m => m.objectId, movieCard)}
    </div>
`;

const movieCard = (movie) => html `
    <div class="single-movie">
        <h4>${movie.name}</h4>
        ${movie.imageUrl ? html `<img src=${movie.imageUrl} class="catalog-img">`: nothing}
        <p>Release date: ${movie.year}<p>
        <p>Description: ${movie.description}<p>
        <a href="/catalog/${movie.objectId}">Details</a>
    </div>
`;

const optionsCard = (option) => html `
<option value="${option[0]}">${option[1]}</option>
`

export async function catalogView(ctx) {

    // a midleware was needed first ...
    console.log(`the query is : ${ctx.query.search}`);
    console.log(`the filter query is : ${ctx.query.filter}`);
    let movies;
    let isSearch = Boolean(ctx.query.search);
    if (!!ctx.query && !!ctx.query.search) {
        const queryString = ctx.query.search;
        console.log(queryString);

        const {results: moviesBySearchWord} = await getMovieBySearchWord(queryString);
        console.log(moviesBySearchWord);
        movies = moviesBySearchWord;

    } else {
        const {results: allMovies} = await getAllMovies();
        movies = allMovies;
    }

    const options = Object.entries(movieOptions);

    console.log(movies);
    ctx.render(catalogTemplate(movies, onSearch, isSearch, options));

    async function onSearch (event) {
        event.preventDefault();
        const searchedWord = event.target.parentElement.querySelector('input');

        ctx.page.redirect(`/catalog?search=${searchedWord.value}`);

    }

}

