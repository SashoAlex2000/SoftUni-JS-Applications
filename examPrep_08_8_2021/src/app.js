import {page, render} from './lib.js'
import { getUserData } from './util.js';
import { showCatalog } from './views/catalog.js';
import { showCreate } from './views/create.js';
import { showDetails } from './views/details.js';
import { showEdit } from './views/edit.js';
import { showLogin } from './views/login.js';
import { updateNav } from './views/nav.js';
import { showProfile } from './views/profile.js';
import { showRegisteer } from './views/register.js';

const root = document.querySelector('main');


page(decorateContext);
page('/', '/dashboard')
page('/login', showLogin)
page('/register', showRegisteer)
page('/dashboard', showCatalog)
page('/dashboard/:id', showDetails)
page('/edit/:id', showEdit)
page('/create', showCreate)
page('/profile', showProfile)

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