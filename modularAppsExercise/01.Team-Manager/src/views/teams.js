import {html}  from '../../node_modules/lit-html/lit-html.js'
import { getAllMembers, getAllTeams, getMembersFromTeam } from '../data/teamInfo.js';
import { repeat } from '../../node_modules/lit-html/directives/repeat.js'

const teamsTemplate = (user, teams, counterDICT) => html `
            <section id="browse">
                
                <article class="pad-med">
                    <h1>Team Browser</h1>
                </article>

                ${user ? html `
                <article class="layout narrow">
                    <div class="pad-small"><a href="#" class="action cta">Create Team</a></div>
                </article>` : ''}
                
                ${teams.map(t => createTeamCard(t, counterDICT))}

            </section>
`;

const createTeamCard = (team, counterDICT) => html `
                <article class="layout">
                    <img src="${team.logoUrl}" class="team-logo left-col">
                    <div class="tm-preview">
                        <h2>${team.name}</h2>
                        <p>${team.description}</p>
                        <span class="details">${counterDICT[team.name].length}
                         Member${counterDICT[team.name].length === 1 ? '' : 's'}</span>
                        <div><a href="/teams/${team._id}" class="action">See details</a></div>
                    </div>
                </article>
`


export async function showTeamsView (ctx) {
    
    const teams = await getAllTeams();
    console.log(teams);

    const counterDICT = {

    }

    for (let team of teams) {

        const currentMembers = await getMembersFromTeam(team._id);
        console.log(`${team.name}: ${currentMembers.length}`);
        counterDICT[team.name] = currentMembers;

    }

    console.log(counterDICT)

    ctx.render(teamsTemplate(ctx.user, teams, counterDICT));

}

