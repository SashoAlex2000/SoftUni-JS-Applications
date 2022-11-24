// import page from "../node_modules/page/page.mjs";
// import { page } from './lib.js'
import { default as page } from '../node_modules/page/page.mjs';

// import { render } from "../node_modules/lit-html/lit-html.js";
import { render } from "./lib.js";
// import { test as page } from './lib.js'
import { html } from './lib.js'

import { showCatalog } from './views/catalog.js'
import { showDetails } from './views/showDetails.js'

const root = document.getElementsByClassName('container')[0];

console.log('before decorate')
function decorateContext(ctx, next) {

    ctx.render = function (content) {
        render(content, document.getElementsByClassName('container')[0]);
    };
    console.log(ctx)
    next();
    
}


page(decorateContext)
page('/index.html', '/');
page('/', homescreenFUnc);
page('/catalog', showCatalog);
page('/catalog/:productId/', showDetails);

function homescreenFUnc () {

    const test = () => html `<h2>TEst home scree</h2>`;
    render(test(), root);

}

page.start();
