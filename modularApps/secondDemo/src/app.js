// import page from "../node_modules/page/page.mjs";
import { page } from './lib.js'
import { html, nothing, render } from "../node_modules/lit-html/lit-html.js";

import { showAbout } from "./views/about.js";
import { showCatalog } from "./views/catalog.js";
import { showCreate } from "./views/create.js";
import { showDetails } from "./views/details.js";
import { showHome } from "./views/home.js";
import { show404 } from "./views/notFound.js";
import { showLogin } from './views/login.js';
import { getUserData } from './data/util.js';
import { logout } from './data/auth.js';


const navTemplate = (user) =>html `
        <a href="/">Home</a>
        <a href="/recipes">catalog</a>
        ${user ? html `<a href="/create">Create</a>`:nothing}
        ${user ? html `<a href="/logout">Logout</a>`: nothing}
        <a href="/about">Avout</a>
        ${user ? html`Hello, ${user.username}!` : html `<a href="/login">LogIn</a>`}        
        ${user ? nothing : html `<a href="/login">Register</a>`}
                
        
`;

function onLogout (ctx) {

    logout();
    ctx.page.redirect('/');

}


function decorateContext(ctx, next) {
    render(navTemplate(ctx.user), document.querySelector('nav'));

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

function session(ctx, next) {

    const user = getUserData();

    if (user) {
        ctx.user=user;
    }

    next();

}

// function secondHandler(ctx, next) {
//     ctx.myVar ++;
//     console.log('second handler');
//     next();
    
// }

// global middleware -> handler applied for all paths;
page(session);
page(decorateContext);
page(parseQuery);

page('/index.html', '/');
page('/', decorateContext, showHome);
page('/recipes',showCatalog);
page('/create',showCreate);
page('/recipes/:productID',showDetails);
page('/about', showAbout);
page('/login', showLogin);
page('/logout', onLogout);
page('*', show404)

page.start();

{/* <a href="/">Home</a>
        <a href="/recipes">catalog</a>
        <a href="/create">Create</a>
        <a href="/about">Avout</a>
        <a href="/login">LogIn</a> */}