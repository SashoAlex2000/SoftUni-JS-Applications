import { applyForJob, getAllApplications, getCurrentApplyStatus } from '../api/applications.js';
import { deleteOffer, getAllOffers, getOfferById } from '../api/data.js';
import { html, nothing } from '../lib.js'

const detailsTemplate = (offer, user, applications,canApply, onDelete, apply) => html`
<section id="details">
<div id="details-wrapper">
  <img id="details-img" src="${offer.imageUrl}" alt="detailsFor${offer.title}" />
  <p id="details-title">${offer.title}</p>
  <p id="details-category">
    Category: <span id="categories">${offer.category}</span>
  </p>
  <p id="details-salary">
    Salary: <span id="salary-number">${offer.salary}</span>
  </p>
  <div id="info-wrapper">
    <div id="details-description">
      <h4>Description</h4>
      <span>${offer.description}</span>
    </div>
    <div id="details-requirements">
      <h4>Requirements</h4>
      <span>${offer.requirements}</span>
    </div>
  </div>
  <p >Applications: <strong id="applications">${applications}</strong></p>

  <!--Edit and Delete are only for creator-->
  ${user ? html`
    ${user._id == offer._ownerId ? html`
    <div id="action-buttons">
        <a href="/edit/${offer._id}" id="edit-btn">Edit</a>
        <a @click=${onDelete} href="javascrpit:void(0)" id="delete-btn">Delete</a>
    </div>` : html`
    ${canApply ? html `
    <div id="action-buttons">
      <a @click=${apply} href="javascrpit:void(0)" id="apply-btn">Apply</a>
    </div>` : nothing}
    `}
  ` : nothing}

</div>
</section>
`;


export async function showDetails(ctx) {

  const id = ctx.params.id;
  const offer = await getOfferById(id)
  const user = ctx.user;

  const applications = await getAllApplications(id);
  console.log('the applications are:')
  console.log(applications);

  let hasApplied = false;
  if (user) {
    hasApplied = await getCurrentApplyStatus(user._id, id) == 1 ? true : false
  }

  const canApply = !!user && user._id != offer._ownerId && !hasApplied;

  ctx.render(detailsTemplate(offer, user, applications,canApply, onDelete, apply));

  async function onDelete() {
    const choice = confirm('Are you sure you want to delete your offer?');

    if (choice) {
      await deleteOffer(id);
      ctx.page.redirect('/offers')
    }


  }

  async function apply () {

    const data = await applyForJob({offerId: offer._id});
    console.log(data);
    ctx.page.redirect('/offers')

  }

} 
