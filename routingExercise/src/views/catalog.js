import { getAll } from '../data/furnitures.js';
import { html } from '../lib.js'


const catalogTemplate = (recipes) => html `
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Welcome to Furniture System</h1>
                <p>Select furniture from the catalog to view details.</p>
            </div>
        </div>
        <div class="row space-top">
            ${recipes.map(r => html `
            <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                            <img src="${r.img}" />
                            <p>${r.description}</p>
                            <footer>
                                <p>Price: <span>${r.price} $</span></p>
                            </footer>
                            <div>
                                <a href="${`http://127.0.0.1:5500/catalog/${r._id}`}" class="btn btn-info">Details</a>
                            </div>
                    </div>
                </div>
            </div>
            `)}
        </div>
`


export async function showCatalog(ctx) {

    const furniture = await getAll();
    ctx.render(catalogTemplate(furniture));

}

