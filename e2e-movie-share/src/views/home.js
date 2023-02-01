
import { html } from '../lib/lit-html.js'

const homeTemplate = (currUser) => html `
<div class="home-page">
    <div class="home-container">
        <div class="home-image-greet">
            ${currUser?html `
            <h2>Welcome back, ${currUser.username}</h2>
            ` : html `
            <h2>Welcome to MovieShare</h2>
            </p>Sign In / Sign Up if you want to experience the beautiful world of moveis</p>
            `}
        </div>
    </div>
</div>
`;

// <img src="${'./static/images/cinema.jpeg'}">

export async function showHome (ctx) {

    const currUser = ctx.user;
    ctx.render(homeTemplate(currUser));

}

