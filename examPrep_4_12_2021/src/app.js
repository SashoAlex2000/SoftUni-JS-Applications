import {page, render} from './lib.js'
import { getUserData } from './util.js';
import { showCatalog } from './views/catalog.js';
import { showCreate } from './views/create.js';
import { showDetails } from './views/details.js';
import { showEdit } from './views/edit.js';
import { showHome } from './views/home.js';
import { showLogin } from './views/login.js';
import { updateNav } from './views/nav.js';
import { showRegisteer } from './views/register.js';
import { showSearch } from './views/search.js';


const root = document.querySelector('main');


page(decorateContext);
page(parseQuery)
page('/', showHome)
page('/login', showLogin)
page('/register', showRegisteer)
page('/catalog', showCatalog)
page('/catalog/:id', showDetails)
page('/edit/:id', showEdit)
page('/create', showCreate)
page('/search', showSearch)

updateNav();
page.start();

function decorateContext (ctx, next) {

    ctx.render = renderMain;
    ctx.updateNav = updateNav;
    const user = getUserData();

    if (user) {

        ctx.user = user;

    }

    next();

}

function renderMain(content) {

    render(content, root);

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