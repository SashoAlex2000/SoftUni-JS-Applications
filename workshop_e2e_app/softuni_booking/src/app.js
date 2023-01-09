import { render, html} from './lib/lit-html.js';
import { until } from './lib/directives/until.js'
import page from './lib/page.mjs'

import * as api from './data/room.js';
import * as request from './data/api.js'

window.api = api;
window.request = request
