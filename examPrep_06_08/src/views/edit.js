
import { getOfferById, updateOffer } from '../api/data.js';
import {html} from '../lib.js'
import { createSubmitHandler } from '../util.js';


const editTemplate = (onEdit, currentOffer) => html `
<section id="edit">
<div class="form">
  <h2>Edit Offer</h2>
  <form @submit=${onEdit} class="edit-form">
    <input
      type="text"
      name="title"
      id="job-title"
      placeholder="Title"
      .value=${currentOffer.title}
    />
    <input
      type="text"
      name="imageUrl"
      id="job-logo"
      placeholder="Company logo url"
      .value=${currentOffer.imageUrl}
    />
    <input
      type="text"
      name="category"
      id="job-category"
      placeholder="Category"
      .value=${currentOffer.category}
    />
    <textarea
      id="job-description"
      name="description"
      placeholder="Description"
      rows="4"
      cols="50"
      .value=${currentOffer.description}
    ></textarea>
    <textarea
      id="job-requirements"
      name="requirements"
      placeholder="Requirements"
      rows="4"
      cols="50"
      .value=${currentOffer.requirements}
    ></textarea>
    <input
      type="text"
      name="salary"
      id="job-salary"
      placeholder="Salary"
      .value=${currentOffer.salary}
    />

    <button type="submit">post</button>
  </form>
</div>
</section>
`;


export async function showEdit (ctx) {

    const id = ctx.params.id;
    const currentOffer = await getOfferById(id);
    console.log(currentOffer)

    ctx.render(editTemplate(createSubmitHandler(onEdit),currentOffer));

    async function onEdit ({title, imageUrl, category, description, requirements, salary}) {

        if ([title, imageUrl, category, description, requirements, salary].some(s => s == '')) {
            alert('Please fill in all fields in order to create a new offer!');
            return;
        }

        await updateOffer(id,{title, imageUrl, category, description, requirements, salary});

        ctx.page.redirect(`/offers/${id}`)

    }

}
