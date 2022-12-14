import { post } from "./api.js";
import { showCatalogView } from "./catalog.js";
import { createSubmitHandles } from "./util.js";

createSubmitHandles('create-form', onCreate);

const section = document.getElementById('create-view');
section.remove();
let ctx = null;

export function showCreateView (context) {
    ctx = context
    ctx.render(section);

}

async function onCreate ({ name, img, ingredients, steps }) {

    ingredients = ingredients.split('n');
    steps = steps.split('n');

    await post('/data/recipes', { name, img, ingredients, steps })

    ctx.goto('catalog-link');

}

