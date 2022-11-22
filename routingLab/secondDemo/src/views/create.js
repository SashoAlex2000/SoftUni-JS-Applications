import { html } from "../../node_modules/lit-html/lit-html.js";

const createTEmplate = () => html `
<h2>Create product page </h2>
`;

export function showCreate (ctx) {

    console.log(ctx);
    ctx.render(createTEmplate());    

}
