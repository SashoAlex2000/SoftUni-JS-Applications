import { checkUserNav } from "./auth.js";
import { showHomeView } from "./home.js";
import { showLoginView } from "./login.js";

checkUserNav();

const views = {
    "login": showLoginView,
    'home': showHomeView
}

// rendered needed reference, because the nav bar is in the same container and gets removed;
let navSection = undefined;

function getNavSection () {

    if (navSection !== undefined) {
        return;
    }

    navSection = document.getElementsByTagName('nav')[0];
    console.log(navSection);
}
getNavSection();

document.getElementsByClassName('navbar-expand-lg')[0].addEventListener('click', onNavigate);

function onNavigate(event) {

    if (event.target.tagName === 'A') {
        let id = null;
        console.log(event.target.id)
        if (event.target.textContent === 'Login') {
            id = 'login'
        } else if (event.target.textContent === 'Home') {
            id = 'home'
        }
        
        if (goto(id)) {
            event.preventDefault();
        }

    }

}

function goto(viewName, ...params) {

    const view = views[viewName];

    if (typeof view === 'function') {

        view({
            goto,
            checkUserNav,
            render
        }, params);
        return true;
    }

    return false;

}

goto('home');

function render (section) {
    console.log('the section is')
    console.log(section.id)
    document.getElementById('container').replaceChildren(section);

    if (section.id !== 'form-login') {
        console.log('prepending')
        document.getElementById('container').prepend(navSection);
    }

}

