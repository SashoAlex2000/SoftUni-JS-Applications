import { deleteListing, getItemById } from '../api/data.js';
import { getDOnationsForUser, getTotalDonations, sendDonation } from '../api/donations.js';
import { html, nothing } from '../lib.js'
import { getUserData } from '../util.js';

const detailsTemplate = (item, canModify, totalDonations, canDonate, onDelete, onDonate) => html `
        <section id="details-page">
            <h1 class="title">Post Details </h1>

            <div id="container">
                <div id="details">
                    <div class="image-wrapper">
                        <img src="${item.imageUrl}" alt="Material Image" class="post-image">
                    </div>
                    <div class="info">
                        <h2 class="title post-title">${item.title}</h2>
                        <p class="post-description">Description: ${item.description}</p>
                        <p class="post-address">Address: ${item.address}</p>
                        <p class="post-number">Phone number: ${item.phone}</p>
                        <p class="donate-Item">Donate Materials: ${totalDonations}</p>

                        ${canModify ? html `
                        <div class="btns">
                            <a href="/edit/${item._id}" class="edit-btn btn">Edit</a>
                            <a @click=${onDelete} href="javascript:void(0)" class="delete-btn btn">Delete</a>
                        </div>
                        ` : html `${canDonate ? html `
                        <div class="btns">
                            <a @click=${onDonate} href="javascript:void(0)" class="donate-btn btn">Donate</a>
                        </div>
                        ` : nothing}`}               
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

    const totalDonations = await getTotalDonations(id);

    console.log('the use is ')
    console.log(user)

    let canDonate

    if (user) {
        const hasUserDonated = await getDOnationsForUser(id, user._id)
        canDonate = !!user &&  hasUserDonated == 0;
    } else {
        canDonate = false;
    }
    
    ctx.render(detailsTemplate(item, canModify, totalDonations, canDonate, onDelete, onDonate));

    async function onDelete() {
        const choice = confirm('Are you sure you want to delete your offer?');
    
        if (choice) {
          deleteListing(id);
          ctx.page.redirect('/')
        }
    
    }

    async function onDonate () {

        await sendDonation(id);
        ctx.page.redirect(`/dashboard/${id}`)

    }

}
