

import { getUserItems } from '../api/data.js';
import { html } from '../lib.js';


const profileTemplate = (user, currentItems) => html `
        <section id="profilePage">
            <div class="userInfo">
                <div class="avatar">
                    <img src="./images/profilePic.png">
                </div>
                <h2>${user.email}</h2>
            </div>
            <div class="board">
                ${currentItems ? html `
                <div class="eventBoard">
                    ${currentItems.map(i => createItemCard(i))}
                </div>
                ` : html `
                <div class="no-events">
                    <p>This user has no events yet!</p>
                </div>
                `}
            </div>
        </section>
`;

const createItemCard = (item) => html `
<div class="event-info">
    <img src="${item.imageUrl}">
    <h2>${item.title}</h2>
    <h6>${item.date}</h6>
    <a href="/catalog/${item._id}" class="details-button">Details</a>
</div>
`
// const createItemCard = (item) => html `
//                     <div class="event-info">
//                         <img src="./images/Moulin-Rouge!-The-Musical.jpg">
//                         <h2>Moulin Rouge! - The Musical</h2>
//                         <h6>July 10, 2018</h6>
//                         <a href="#" class="details-button">Details</a>
//                     </div>
// `


export async function showProfile (ctx) {

    const user = ctx.user;

    const currentItems = await getUserItems(user._id)
    console.log(currentItems)

    ctx.render(profileTemplate(user, currentItems));

}
