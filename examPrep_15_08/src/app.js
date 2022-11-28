
import { page } from './lib.js'
import { render } from './lib.js'
import { getUserData } from './util.js';
import { showAdd } from './views/add.js';
import { showCatalog } from './views/catalog.js';
import { showDetails } from './views/details.js';
import { showEdit } from './views/edit.js';
import { showHome } from './views/home.js';
import { showLogin } from './views/login.js';
import { updateNav } from './views/nav.js';
import { showRegister } from './views/register.js';
import { showSearch } from './views/search.js';

const root = document.querySelector('main');

page(decorateContext);
page(parseQuery);
page('index.html', '/')
page('/', showHome);
page('/catalog', showCatalog);
page('/catalog/:id', showDetails);
page('/add', showAdd);
page('/login',showLogin);
page('/register', showRegister);
page('/search', showSearch);
page('/edit/:id', showEdit);

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

function renderMain(content) {

    render(content, root);

}