
// import { html, render } from '../node_modules/lit-html/lit-html.js'
// import {page} from '../node_modules/page/page.mjs';
import {page} from './lib.js'
import {html, render} from '../node_modules/lit-html/lit-html.js'
import { showHomeView } from './views/home.js'
import { showLoginView } from './views/login.js';
import { getUserData } from './data/util.js';
import { showTeamsView } from './views/teams.js';
import { showDetails } from './views/details.js';


const navTemplate = (user) => html `
            <a href="/" class="site-logo">Team Manager</a>
            <nav>
                <a href="/teams" class="action">Browse Teams</a>
                ${user ? ``: html `<a href="/login" class="action">Login</a>`}
                ${user ? ``: html `<a href="/register" class="action">Register</a>`}
                ${user ? html `<a href="#" class="action">My Teams</a>`: ``}
                ${user ? html `<a href="#" class="action">Logout</a>`: ``}
                
            </nav>
`;



function decorateContext (ctx, next) {
    render(navTemplate(ctx.user), document.querySelector('header'));

    console.log('first handler')
    ctx.render = function (content) {
        render(content, document.querySelector('main'));
    }

    next();
    
}

function session(ctx, next) {

    const user = getUserData();

    if (user) {
        ctx.user=user;
    }

    next();

}

console.log('test')
console.log(document.querySelector('main'))

page(session);
page(decorateContext);
page('/', showHomeView);
page('index.html', showHomeView);
page('/login', showLoginView);
page('/teams/:teamId', showDetails);
page('/teams', showTeamsView);

page.start();
