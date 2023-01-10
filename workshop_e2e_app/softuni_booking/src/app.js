import { render, html} from './lib/lit-html.js';
import { until } from './lib/directives/until.js'
import page from './lib/page.mjs'
import { addRender } from './middleware/render.js';
import { createView } from './views/create.js';
import { addSesstion } from './middleware/session.js';
import { getUserData } from './util.js';


import * as api from './data/user.js'
import { catalogView } from './views/catalog.js';
import { loginView } from './views/login.js';

page (addRender(document.querySelector('main')));
page(addSesstion(getUserData));

page('/', '/rooms');
page('/rooms', catalogView)
page('/rooms/:id', ({params: {id}}) => console.log('details', id))
page('/create', createView)
page('/login', loginView)

page.start()
window.api = api;
