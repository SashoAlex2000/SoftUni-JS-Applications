
import { getUserListings } from '../api/data.js';
import { html, nothing } from '../lib.js'


const profileTemplate = (data) => html `
        <section id="my-posts-page">
            <h1 class="title">My Posts</h1>

            ${!!data && data.length > 0 ? html `
            <div class="my-posts">
                ${data.map(i => createItemCard(i))}
            </div>` : html `<h1 class="title no-posts-title">You have no posts yet!</h1>`}
            
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

export async function showProfile (ctx) {

    let user;

    if (ctx.user) {

        user = ctx.user

    }

    console.log(user);
    const data = await getUserListings(user._id);
    console.log(data);

    ctx.render(profileTemplate(data));

}

