import { html } from "../../node_modules/lit-html/lit-html.js";

const aboutTemplate = () => html `
<h2>This is the about page! (from views folder) </h2>
`

export function showAbout (ctx) {

    ctx.render(aboutTemplate())

}
