import { getAllOffers } from '../api/data.js';
import {html} from '../lib.js'

const offerTemplate = (offers) => html `
<section id="dashboard">
<h2>Job Offers</h2>

${offers.length > 0 ? html `${
    offers.map(o => createOfferCard(o))
}` : html `<h2>No offers yet.</h2>`}
</section>
`; 


const createOfferCard = (offer) => html `
<div class="offer">
  <img src="${offer.imageUrl}" alt="jobDetails" />
  <p>
    <strong>Title: </strong
    ><span class="title">${offer.title}</span>
  </p>
  <p><strong>Salary:</strong><span class="salary">${offer.salary}</span></p>
  <a class="details-btn" href="/offers/${offer._id}">Details</a>
</div>
`;


export async function showOffers (ctx) {

    const offers = await getAllOffers();
    ctx.render(offerTemplate(offers));

}
