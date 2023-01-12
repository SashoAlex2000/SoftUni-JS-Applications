import { html, nothing } from '../lib/lit-html.js';
import { createSubmitHandler } from '../util.js';
import * as roomService from '../data/room.js';
import { repeat } from '../lib/directives/repeat.js'
import { hasUser } from '../middleware/guards.js';


const detailsTemplate = (room, isOwner, hasUser) => html `
<h2>${room.name}</h2>
<p>Location: ${room.location}</p>
<p>Beds: ${room.beds}</p>
${hasUser && !isOwner ? html `<a href="/book/${room.objectId}">Book this room</a>` : nothing}
${isOwner ? html `
<a href="/edit/${room.objectId}">Edit</a>
<a href="javascript:void(0)">Delete</a>
`: nothing}
`;



export async function detailsView (ctx) {

    const hasUser = Boolean(ctx.user);
    const isOwner = ctx.data?.owner?.objectId === ctx.user?.objectId;
    ctx.render(detailsTemplate(ctx.data, isOwner, hasUser));

}



