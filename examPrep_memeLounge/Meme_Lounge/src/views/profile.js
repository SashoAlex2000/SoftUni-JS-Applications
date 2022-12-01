
import { getMemesByUser } from '../api/data.js';
import { html } from '../lib.js';


const profileTemplate = (user, currentMemes) => html `
        <section id="user-profile-page" class="user-profile">
            <article class="user-info">
                
                <img id="user-avatar-url" alt="user-profile" 
                src="${user.gender == 'male' ? '/images/male.png' : '/images/female.png'}">
                <div class="user-content">
                    <p>Username: ${user.username}</p>
                    <p>Email: ${user.email}</p>
                    <p>My memes count: ${!!currentMemes ? currentMemes.length : 0}</p>
                </div>
            </article>
            <h1 id="user-listings-title">User Memes</h1>
            <div class="user-meme-listings">
                <!-- Display : All created memes by this user (If any) --> 
                ${!!currentMemes && currentMemes.length > 0 ? html `
                ${currentMemes.map(m => createMemeCard(m))}
                ` : html `
                <p class="no-memes">No memes in database.</p>
                `}

                <!-- Display : If user doesn't have own memes  --> 
                
            </div>
        </section>
`;


const createMemeCard = (meme) => html `
                <div class="user-meme">
                    <p class="user-meme-title">${meme.title}</p>
                    <img class="userProfileImage" alt="meme-img" src="${meme.imageUrl}">
                    <a class="button" href="/memes/${meme._id}">Details</a>
                </div>
`;


export async function showProfile (ctx) {

    const user = ctx.user;
    console.log(user)
    const currentMemes = await getMemesByUser(user._id);
    

    ctx.render(profileTemplate(user, currentMemes));

}
