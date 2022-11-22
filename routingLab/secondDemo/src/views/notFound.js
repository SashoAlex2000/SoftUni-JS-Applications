import { html } from "../../node_modules/lit-html/lit-html.js";

const notFoundTemplate = () => html `
<h2>Product details </h2>
`;

export function show404 (ctx) {

    // document.querySelector('main').innerHTML = `<h2>404 -> Not Found! :( </h2>`;
    ctx.render(notFoundTemplate());

}
