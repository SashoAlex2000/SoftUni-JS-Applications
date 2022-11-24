import { html } from '../lib.js'


const detailTemplate = (id) => html`
<h2>Tesitng</h2>
<p>${id}</p>
`;

export function showDetails(ctx) {
    console.log('before getting id')
    console.log(ctx);
    console.log(ctx.params.productId)
    const id = ctx.params.productId;
    console.log(id);
    ctx.render(detailTemplate(id));
    
}

