

import { contacts as data } from './contacts.js';
import { html, render, nothing } from './node_modules/lit-html/lit-html.js';
import { styleMap } from './node_modules/lit-html/directives/style-map.js';

const contacts = data.map(c => Object.assign({}, c, { active: false }));

const root = document.getElementById('contacts');

const contacCard = (contact, style = {}) => html`
<div class="contact card">
<div>
    <i class="far fa-user-circle gravatar"></i>
</div>
<div class="info">
    <h2>Name: ${contact.name}</h2>
    <button class="detailsBtn" id="${contact.id}" >Details</button>
    ${contact.active
        ? html`<div class="details" style=${styleMap(style)}>
                    <p>Phone number: ${contact.phoneNumber}</p>
                    <p>Email: ${contact.email}</p>
                </div>`
        : nothing
    }
    
</div>
</div>
`;

root.addEventListener('click', toggleDetails);

function update() {

    render(contacts.map(contacCard), root);

}

update();

function toggleDetails(event) {

    if (event.target.classList.contains('detailsBtn')) {

        const id = event.target.id;
        const contact = contacts.find(c => c.id == id);
        contact.active = !contact.active;
        update();

        // done with the old delegation and DOM manipulation 
        // const parent = event.target.parentElement;
        // const details = parent.querySelector('.details');
        // if (details.style.display === 'none') {
        //     details.style.display = 'block'; 
        // }else {
        //     details.style.display = 'none'
        // }

    }

}
