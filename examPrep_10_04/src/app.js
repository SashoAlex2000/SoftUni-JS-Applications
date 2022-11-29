import {page, render} from './lib.js'
import { showCreate } from './views/create.js';
import { showDashboard } from './views/dashboard.js';
import { showDetails } from './views/details.js';
import { showEdit } from './views/edit.js';
import { showLogin } from './views/login.js';
import { updateNav } from './views/nav.js';
import { showRegister } from './views/register.js';

const root = document.querySelector('main');

page(decorateContext)
page('/', showDashboard)
page('/login', showLogin)
page('/register', showRegister)
page('/create', showCreate)
page('/dashboard', '/')
page('/myposts', () => console.log('these are my posts'))
page('/dashboard/:id', showDetails)
page('/edit/:id', showEdit)

updateNav();
page.start();

function decorateContext (ctx, next) {

    ctx.render = renderMain
    ctx.updateNav = updateNav;

    // const user = getUserData();

    // if (user) {
    //     ctx.user = user;
    // }

    next()

}

function renderMain(content) {

    render(content, root);

}
