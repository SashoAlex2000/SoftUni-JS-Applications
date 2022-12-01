
import { getItemsForSpecificUser } from '../api/data.js';
import { html, nothing } from '../lib.js'


const profileTemplate = (currentCars) => html `
        <section id="my-listings">
            <h1>My car listings</h1>
            <div class="listings">
                ${!!currentCars && currentCars.length > 0 ? html `
                ${currentCars.map(c => createCarCard(c))}
                ` : html `
                <p class="no-cars"> You haven't listed any cars yet.</p>
                `}
            </div>
        </section>
`;

const createCarCard = (car) => html `
<div class="listing">
<div class="preview">
    <img src="${car.imageUrl}">
</div>
<h2>${car.brand} ${car.model}</h2>
<div class="info">
    <div class="data-info">
        <h3>Year: ${car.year}</h3>
        <h3>Price: ${car.price} $</h3>
    </div>
    <div class="data-buttons">
        <a href="/catalog/${car._id}" class="button-carDetails">Details</a>
    </div>
</div>
</div>
`;

export async function showProfile (ctx) {

    const userId = ctx.user._id

    const currentCars = await getItemsForSpecificUser(userId);
    console.log(currentCars);

    ctx.render(profileTemplate(currentCars));

}
