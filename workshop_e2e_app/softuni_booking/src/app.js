import { render, html} from './lib/lit-html.js';
import { until } from './lib/directives/until.js'
import page from './lib/page.mjs'
import { addRender } from './middleware/render.js';
import { createView } from './views/create.js';
import { addSesstion } from './middleware/session.js';
import { getUserData } from './util.js';
import { catalogView } from './views/catalog.js';
import { loginView } from './views/login.js';
import { registerView } from './views/register.js';
import { addUserNav } from './middleware/userNav.js';
import { navTemplate } from './views/nav.js';
import { homeView } from './middleware/home.js';

page (addRender(document.querySelector('main'), document.querySelector('header')));
page(addSesstion(getUserData));
page(addUserNav(navTemplate))

page('/', homeView);
page('/rooms', catalogView)
page('/rooms/:id', ({params: {id}}) => console.log('details', id))
page('/create', createView)
page('/login', loginView)
page('/register', registerView)

page.start()
