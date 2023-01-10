import { html } from '../lib/lit-html.js';
import { createSubmitHandler } from '../util.js';
import * as roomService from '../data/room.js';
import { repeat } from '../lib/directives/repeat.js'

const catalogtemplate = (list) => html `
<h2>Available rooms</h2>
${list}
`;

const listTemplate = (rooms) => html `
<section>
    ${repeat (rooms, r => r.objectId, roomCard)}
</section>
`;

const roomCard = (room) => html `
<article class="room-card">
    <h3>${room.name}</h3>
    <p>Location: ${room.location}</p>
    <p>Beds: ${room.beds}</p>
    <p><a class="action" href="/rooms/${room.objectId}">More details</a></p>
</article>
`;


export async function catalogView(ctx) {

    ctx.render(catalogtemplate(html `<p>Loading &hellip; </p>`))
    const { results: rooms } = await roomService.getAll();

    ctx.render(catalogtemplate(listTemplate(rooms)));

}
