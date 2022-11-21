import { html, render, nothing } from '../node_modules/lit-html/lit-html.js';
import { styleMap } from '../node_modules/lit-html/directives/style-map.js';

import { towns } from './towns.js'

function search() {

    const root = document.getElementById('towns');

    const createAllTowns = (listOfTowns, word = '') => html `
    <ul>
        ${listOfTowns.map(t => creeatTown(t, word))}
    </ul>
    `;

    const creeatTown = (town, word) => html `
    <li class="${(word && town.toLowerCase().includes(word.toLowerCase())) ? 'active': 'default'}">${town}</li>
    `;

    render(createAllTowns(towns), root);

    const button = document.querySelector('button');
    button.addEventListener('click', highlightFunc);
    const userInput = document.querySelector('input');

    function highlightFunc (event) {

        const searchedWord = userInput.value;
        render(createAllTowns(towns, searchedWord), root);
        userInput.value = '';

    }

}

search();
