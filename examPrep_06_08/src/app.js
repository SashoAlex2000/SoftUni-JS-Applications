import { page, render } from './lib.js'
import { showHome } from './views/home.js';
import { showLogin } from './views/login.js';
import { updateNav } from './views/nav.js';
import { showRegister } from './views/register.js';

const root = document.querySelector('main');

page(decorateContext)
page('index.hmtl', '/')
page('/', showHome)
page('/offers', () => console.log('it is dashboard'))
page('/offers/:id', () => console.log('it is detail for offer'))
page('/login', showLogin)
page('/register', showRegister)
page('/create', () => console.log('it is create'))

updateNav();
page.start();

function decorateContext (ctx, next) {

    ctx.render = renderMain
    ctx.updateNav = updateNav;

    next()

}

function renderMain(content) {

    render(content, root);

}

