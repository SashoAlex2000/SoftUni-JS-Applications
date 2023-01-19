
import { html } from '../lib/lit-html.js'

const homeTemplate = () => html `
<h1>This is going to be the home page!</h1>
`;


export async function showHome (ctx) {

    ctx.render(homeTemplate());

}

