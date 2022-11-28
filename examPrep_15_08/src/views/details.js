import { deleteShoe, getShoeById } from '../api/data.js';
import { html, nothing } from '../lib.js'

const detailsTemplate = (shoe, canModify, onDelete) => html `
<section id="details">
<div id="details-wrapper">
  <p id="details-title">Shoe Details</p>
  <div id="img-wrapper">
    <img src="${shoe.imageUrl}" alt="example1" />
  </div>
  <div id="info-wrapper">
    <p>Brand: <span id="details-brand">${shoe.brand}</span></p>
    <p>
      Model: <span id="details-model">${shoe.model}</span>
    </p>
    <p>Release date: <span id="details-release">${shoe.release}</span></p>
    <p>Designer: <span id="details-designer">${shoe.designer}</span></p>
    <p>Value: <span id="details-value">${shoe.value}</span></p>
  </div>
  ${canModify ? html `
  <div id="action-buttons">
    <a href="/edit/${shoe._id}" id="edit-btn">Edit</a>
    <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
  </div>` : nothing}

</div>
</section>
`;

export async function showDetails (ctx) {

    const id = ctx.params.id;
    const shoe = await getShoeById(id)
    console.log(shoe)
    let userId;

    if (ctx.user) {
      userId = ctx.user._id
    }

    const canModify = !!userId && shoe._ownerId == userId;

    ctx.render(detailsTemplate(shoe, canModify, onDelete))

    async function onDelete () {

      const choice = confirm('Are you sure you want to delete this model?');

        if (choice) {

            await deleteShoe(id);
            ctx.page.redirect('/catalog')

        }

    }

}
