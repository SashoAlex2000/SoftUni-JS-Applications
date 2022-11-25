// import page from "../node_modules/page/page.mjs";
import { page } from './lib.js'
import { render } from "../node_modules/lit-html/lit-html.js";

import { showAbout } from "./views/about.js";
import { showCatalog } from "./views/catalog.js";
import { showCreate } from "./views/create.js";
import { showDetails } from "./views/details.js";
import { showHome } from "./views/home.js";
import { show404 } from "./views/notFound.js";


function decorateContext(ctx, next) {

    console.log('first handler');
    ctx.myVar = 5;
    ctx.render = function (content) {
        render(content,document.querySelector('main'));
    };
    next();
    
}

function parseQuery (ctx, next) {

    ctx.query = {
        // initialize empty object first to avoid error.
    }

    if (ctx.querystring) {
        const query = Object.fromEntries(ctx.querystring
            .split('&')
            .map(e => e.split('=')))
        Object.assign(ctx.query, query);
    }

    next();
    
}

// function secondHandler(ctx, next) {
//     ctx.myVar ++;
//     console.log('second handler');
//     next();
    
// }

// global middleware -> handler applied for all paths;
page(decorateContext);
page(parseQuery);
page('/index.html', '/');
page('/', decorateContext, showHome);
page('/recipes',showCatalog);
page('/create',showCreate);
page('/recipes/:productID',showDetails);
page('/about', showAbout);
page('*', show404)

page.start();

