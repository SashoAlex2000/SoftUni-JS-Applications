import { deleteListing, getItemById } from '../api/data.js';
import { html, nothing } from '../lib.js'
import { getUserData } from '../util.js';

const detailsTemplate = (item, canModify, onDelete) => html `
        <section id="details-page">
            <h1 class="title">Post Details </h1>

            <div id="container">
                <div id="details">
                    <div class="image-wrapper">
                        <img src="${item.imageUrl}" alt="Material Image" class="post-image">
                    </div>
                    <div class="info">
                        <h2 class="title post-title">${item.title}</h2>
                        <p class="post-description">${item.description}</p>
                        <p class="post-address">${item.address}</p>
                        <p class="post-number">${item.phone}</p>
                        <p class="donate-Item">Donate Materials: 0</p>

                        ${canModify ? html `
                        <div class="btns">
                            <a href="/edit/${item._id}" class="edit-btn btn">Edit</a>
                            <a @click=${onDelete} href="#" class="delete-btn btn">Delete</a>
                            <a href="#" class="donate-btn btn" style="display: none;">Donate</a>
                        </div>
                        ` : nothing}               
                    </div>
                </div>
            </div>
        </section>
`;


export async function showDetails (ctx) {

    const id = ctx.params.id;
    const item = await getItemById(id);
    const user = await getUserData();

    const canModify = !!user && user._id == item._ownerId;
    
    ctx.render(detailsTemplate(item, canModify, onDelete));

    async function onDelete() {
        const choice = confirm('Are you sure you want to delete your offer?');
    
        if (choice) {
          deleteListing(id);
          ctx.page.redirect('/dashboard')
        }
    
    
      }

}
