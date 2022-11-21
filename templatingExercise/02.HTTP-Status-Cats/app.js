import { html, render, nothing } from '../node_modules/lit-html/lit-html.js';
import { styleMap } from '../node_modules/lit-html/directives/style-map.js';

import { cats as importedCats} from './catSeeder.js';

let cats = importedCats.map(c => Object.assign({}, 
    c, 
    { active: false }))

console.log(cats);

const root = document.getElementById('allCats');
root.addEventListener('click', showDetails);

const createCat = (cat) => html`
            <li>
                <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
                <div class="info">
                    <button class="showBtn" id="${cat.id}">Show status code</button>
                    ${cat.active
                    ? html `<div class="status" id="${cat.id}">
                    <h4>Status Code: ${cat.statusCode}</h4>
                    <p>${cat.statusMessage}</p>
                    </div>`
                    : nothing
                    }
                </div>
            </li>
            `;

const createAllCats = (listOfCats) => html `
<ul>
    ${listOfCats.map(c => createCat(c))}
</ul>
`;

render(createAllCats(cats), root);

function showDetails (event) {

    if (event.target.classList.contains('showBtn')) {

        if (event.target.textContent === "Show status code") {
            event.target.textContent = "Hide status code";
        }else {
            event.target.textContent = "Show status code";
        }

        const id = event.target.id;
        const cat = cats.find(c => c.id == id);
        cat.active = !cat.active;
        render(createAllCats(cats), root);

    }

}