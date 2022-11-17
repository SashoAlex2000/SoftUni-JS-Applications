import { checkUserNav, onLogout } from "./auth.js";
import { showCatalogView } from "./catalog.js";
import { showCreateView } from "./create.js";
import "./details.js";
import { showDetailView } from "./details.js";
import { showHomeView } from "./home.js";

import './login.js';
import { showLoginView } from "./login.js";
import { showRegisterView } from "./register.js";

checkUserNav();

// used to start the app in the catalogue view
// showCatalogView();



// links and event listeners shouldnt be the responisbility of each module, app should do it :?
// links stolen from other pages:
// document.getElementById('home-link').addEventListener('click', showHomeView);
// document.getElementById('login-link').addEventListener('click', showLoginView);
// document.getElementById('catalog-link').addEventListener('click', showCatalogView);
// document.getElementById('logout-link').addEventListener('click', onLogout);
// function registerView (id, ShowView) {
//     document.getElementById(id).addEventListener('click', ShowView);
// }
// ^^^ not the way we're going to do it

// idOfLink : module to be visualized
const views = {
    "home-link": showHomeView,
    "catalog-link": showCatalogView,
    "login-link": showLoginView,
    "register-link": showRegisterView,
    "logout-link": onLogout,
    "create-link": showCreateView,
    "details-link": showDetailView
}

// we will start the app in the home view, done with goto now
// showHomeView();
goto('home-link')

document.querySelector('nav').addEventListener('click', onNavigate);

function onNavigate(event) {

    if (event.target.tagName === 'A') {

        const id = event.target.id;
        if (goto(id)) {
            event.preventDefault();
        }

    }

}

// Dependency injection here -> puts a goto reference in each view call, 
// thus giving it access to the goto navigation
function goto(viewName, ...params) {

    const view = views[viewName];

    if (typeof view === 'function') {
        // make the screen blank first, in real apps skeleton is used
        // [...document.querySelectorAll('section')].forEach(s => s.style.display = 'none'); 
        // document.querySelector('main').replaceChildren();
        view({
            goto,
            checkUserNav,
            render
        }, params);
        return true;
    }

    return false;

}

function render (section) {

    document.querySelector('main').replaceChildren(section);

}

