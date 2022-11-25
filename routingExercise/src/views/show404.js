import { html } from '../lib.js'


const errorTemplate = () => html `
    <h1>THIS IS THE WRONG PAGE, FOOL!</h1>
`

export async function show404(ctx) {

    ctx.render(errorTemplate());

}
