import { getAllItems } from '../api/data.js';
import { html } from '../lib.js'

const dashboardTemplate = (items) => html `
        <section id="dashboard-page">
            <h1 class="title">All Posts</h1>
            ${!!items && items.length > 0 ? html `
            <div class="all-posts">
                ${items.map(i => createItemCard(i))}
            </div>` : html `
            <h1 class="title no-posts-title">No posts yet!</h1>
            `}
        </section>
`;

const createItemCard = (item) => html `
                <div class="post">
                    <h2 class="post-title">${item.title}</h2>
                    <img class="post-image" src="${item.imageUrl}" alt="Material Image">
                    <div class="btn-wrapper">
                        <a href="/dashboard/${item._id}" class="details-btn btn">Details</a>
                    </div>
                </div>
`;


export async function showDashboard (ctx) {

    const items = await getAllItems();
    
    ctx.render(dashboardTemplate(items));

}
