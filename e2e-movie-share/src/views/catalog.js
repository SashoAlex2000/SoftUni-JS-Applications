
import { html, nothing } from "../lib/lit-html.js";
import { repeat } from '../lib/directives/repeat.js'
import { getAllMovies } from "../data/movie.js";

const catalogTemplate = (movies) => html `
    <div class="movie-wrapper">
        ${repeat(movies, m => m.objectId, movieCard)}
    </div>
`;

const movieCard = (movie) => html `
    <div class="single-movie">
        <h4>${movie.name}</h4>
        ${movie.imageUrl ? html `<img src=${movie.imageUrl} class="catalog-img">`: nothing}
        <p>Release date: ${movie.year}<p>
        <p>Description: ${movie.description}<p>
        <p>${movie.rating}<p>
    </div>
`;

export async function catalogView(ctx) {

    const {results: allMovies} = await getAllMovies();
    ctx.render(catalogTemplate(allMovies));

}

