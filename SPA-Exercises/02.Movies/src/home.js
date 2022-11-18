import { get } from "./api.js";


const section = document.getElementById('home-page')
section.remove();

let ctx = null;

export async function showHomeView(innerContext) {

    ctx = innerContext;
    ctx.render(section);
    ctx.checkUserNav();

    const movies = await getAllMovies();
    
    displayMovies(movies);

}

async function getAllMovies() {

    const movies = await get('/data/movies');
    return [...movies];

}


function displayMovies (movies) {

    const cards = movies.map(createMovieCard);

    const fragment = document.createDocumentFragment();

    for (let item of cards) {
        fragment.appendChild(item);
    }

    const listOfMovies = document.getElementById('movies-list');

    listOfMovies.replaceChildren(fragment);

}

function createMovieCard (movie) {

    const newMetaDIV = document.createElement('div');
    newMetaDIV.classList.add('row');
    newMetaDIV.classList.add('bg-light');
    newMetaDIV.classList.add('text-dark');

    newMetaDIV.innerHTML = `
    <h1>Movie title: ${movie.title}</h1>

            <div class="col-md-8">
              <img class="img-thumbnail" src="${movie.img}" alt="Movie">
            </div>
            <div class="col-md-4 text-center">
              <h3 class="my-3">Movie Description</h3>
              <p>
                ${movie.description}
              </p>
              <a class="btn btn-danger" href="#">Delete</a>
              <a class="btn btn-warning" href="#">Edit</a>
              <a class="btn btn-primary" href="#">Like</a>
              <span class="enrolled-span">Liked 1</span>
            </div>
    `;

    return newMetaDIV

}

/* <div class="row bg-light text-dark">
            <h1>Movie title: Black Widow</h1>

            <div class="col-md-8">
              <img class="img-thumbnail" src="https://miro.medium.com/max/735/1*akkAa2CcbKqHsvqVusF3-w.jpeg" alt="Movie">
            </div>
            <div class="col-md-4 text-center">
              <h3 class="my-3">Movie Description</h3>
              <p>
                Natasha Romanoff aka Black Widow confronts the darker parts of
                her ledger when a dangerous conspiracy with ties to her past
                arises. Comes on the screens 2020.
              </p>
              <a class="btn btn-danger" href="#">Delete</a>
              <a class="btn btn-warning" href="#">Edit</a>
              <a class="btn btn-primary" href="#">Like</a>
              <span class="enrolled-span">Liked 1</span>
            </div>
          </div> */
