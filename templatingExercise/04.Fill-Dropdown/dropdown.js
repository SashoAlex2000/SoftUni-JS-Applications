import { html, render, nothing } from '../node_modules/lit-html/lit-html.js';

async function addItem() {

    async function getAndPlaceOptions () {
        const appendOption = (options) => html `
        ${options.map((o) => html `<option value="${o._id}">${o.text}</option>`)}
        `;

        const dropdown = document.getElementById('menu');

        const response = await fetch('http://localhost:3030/jsonstore/advanced/dropdown');
        const data = await response.json();

        console.log(Object.values(data));
        // Object.values(data).forEach(v => dropdown.add(new Option(v.text, v._id)))
        // Object.values(data).forEach(v => render(appendOption(v), dropdown));

        const result = appendOption(Object.values(data));
        console.log(result);
        render(result, dropdown);
    }

    getAndPlaceOptions();


    document.querySelectorAll('input')[1].addEventListener('click', submitOption);
    const inputText = document.getElementById('itemText');

    async function submitOption (event) {

        event.preventDefault();
        const input = inputText.value;

        const response = await fetch('http://localhost:3030/jsonstore/advanced/dropdown', {
            method: 'post',
            headers:{
                'Content-Type': "application/json"
            },
            body: JSON.stringify({text: input})
        });

        const data = await response.json();
        inputText.value = '';

        getAndPlaceOptions();

    }

}

addItem();

