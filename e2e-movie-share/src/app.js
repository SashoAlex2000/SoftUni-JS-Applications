
// imports 
import { render, html} from './lib/lit-html.js';
import { until } from './lib/directives/until.js'
import page from './lib/page.mjs'
import { addRender } from './middleware/render.js';
import { showHome } from './views/home.js';
import { addSession } from './middleware/session.js';
import { getUserData } from './util.js';
import { addUserNav } from './middleware/navRender.js';
import { navTemplate } from './views/nav.js';
import { loginView } from './views/login.js';
import { onLogout } from './views/logout.js';
import { registerView } from './views/register.js';
import { create, getAllMovies } from './data/movie.js';
import { createMovieView } from './views/create.js';
import { catalogView } from './views/catalog.js';
import { authRequiredGuard } from './middleware/guards.js';


// middlewares added, loading ctx
page(addRender(document.getElementById('main'), document.querySelector('header')));
page(addSession(getUserData));
page(addUserNav(navTemplate));

// navigation 
page('/', showHome);
page('/login', loginView);
page('/register', registerView);
page('/logout', onLogout);
page('/catalog', catalogView);
page('/create', authRequiredGuard(), createMovieView);

// starting the app
page.start();

window.create = create;
window.getAllMovies = getAllMovies;
