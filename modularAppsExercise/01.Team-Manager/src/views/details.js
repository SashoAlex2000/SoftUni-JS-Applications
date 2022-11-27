import {html, templateCaches}  from '../../node_modules/lit-html/lit-html.js'
import { until } from '../../node_modules/lit-html/directives/until.js'
import { getTeamInfo } from '../data/teamInfo.js'


const asyncTemplate = (recipePromise) => html`
${until(recipePromise, recipeSkeleton())}
`

const detailsTemplate = (id) => html `
<h2>DETAILS for ${id}</h2>
`;


const recipeSkeleton = () => html `
<h1>LOADING ... </h1>
`

export async function showDetails(ctx) {
    console.log(ctx.params.teamId)
    const id = ctx.params.teamId;
    const user = ctx.user;

    let userId;
    if (user) {
        userId = user._id;
    }
    await loadTeam(id);

    ctx.render(asyncTemplate(loadTeam(id)));    
    // ctx.render(detailsTemplate());    

}

async function loadTeam (id) {

    
    const teamInfo = await getTeamInfo(id);
    console.log(teamInfo)
    return detailsTemplate(teamInfo.name)

}

