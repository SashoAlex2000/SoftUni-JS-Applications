import { html } from "../../node_modules/lit-html/lit-html.js";

const homeTemplate = () => html `
<h2>Product details </h2>
`;


export function showHome (ctx, next) {
    console.log(ctx);
    ctx.myVar ++;
    console.log(ctx.myVar)
    ctx.render(homeTemplate())

    // ctx.render(`<h2>This is the home page!</h2>
    // <button>Clicker</button>
    // <p>ctx.myVar: ${ctx.myVar}</p>
    // `);
    // document.querySelector('button').addEventListener('click', () => {
    //     ctx.page.redirect('/contact')
    // })

}
