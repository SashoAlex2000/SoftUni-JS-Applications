import { get } from '../api/api.js';
import {html, nothing} from '../lib.js'
import { createSubmitHandler } from '../util.js';

const searchTemplate = (onSearch, shoesFound, user) => html `
<section id="search">
<h2>Search by Brand</h2>

<form @submit=${onSearch} class="search-wrapper cf">
  <input
    id="#search-input"
    type="text"
    name="search"
    placeholder="Search here..."
    required
  />
  <button type="submit">Search</button>
</form>

    ${!!shoesFound && shoesFound.length > 0 ? html `
    <h3>Results:</h3>
    <div id="search-container">
    <ul class="card-wrapper">
        ${shoesFound.map(s => createShoeCard(s, user))}
    </ul>
    </div>
  ` : html `<h2>There are no results found.</h2>`}


</section>
`;

const createShoeCard = (shoe, user) => html `
    <li class="card">
      <img src="${shoe.imageUrl}" alt="travis" />
      <p>
        <strong>Brand: </strong><span class="brand">${shoe.brand}</span>
      </p>
      <p>
        <strong>Model: </strong
        ><span class="model">${shoe.model}</span>
      </p>
      <p><strong>Value:</strong><span class="value">${shoe.value}</span>$</p>
      ${user ? html `<a class="details-btn" href="/catalog/${shoe._id}">Details</a>` : nothing}
      
    </li>
`


export async function showSearch (ctx) {

    console.log('the query string is ');
    console.log(ctx.query.search);
    const queryString = ctx.query.search
    let shoesFound;
    const user = !!ctx.user;
    console.log(user)

    if (ctx.query.search) {
        const response = await get(`/data/shoes?where=brand%20LIKE%20%22${queryString}%22`);
        console.log(response);
        shoesFound = response;
        console.log(shoesFound);
    }

    ctx.render(searchTemplate(createSubmitHandler(onSearch), shoesFound, user));

    async function onSearch({search}) {
        // const searchedShoew = await get(`/data/shoes?where=brand%20LIKE%20%22${name}%22`);
        ctx.page.redirect(`/search?search=${search}`);

    }

}
