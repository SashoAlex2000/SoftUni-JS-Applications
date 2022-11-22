// on app start - address bar (window location path)
// on back/forward - popstate event -> then again window location path
// link nav - > event.target.href

document.querySelector('nav').addEventListener('click', onNavigate);
window.addEventListener('popstate', onPopState)
const main = document.querySelector('main');

const views = {
    '/': () => '<h1>Home Page!</h1>',
    '/catalog': () => '<h1>Catalog Page!</h1>',
    '/about': () => '<h1>About Page!</h1>',
}

onPopState();

function onNavigate(event) {

    if (event.target.tagName === 'A') {
        const url = new URL(event.target.href);

        if (showView(url.pathname)) {
            event.preventDefault();
            history.pushState(null, '', url.pathname)
        }

    }

}

function onPopState() {
    const startView = window.location.pathname;
    showView(startView);

}

function showView(name) {
    const view = views[name];
    if (typeof view == 'function') {
        main.innerHTML = view();
        return true;
    } else {
        return false;
    }

}


