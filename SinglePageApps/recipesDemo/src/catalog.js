// this module gets the data from the REST service and display them

import { showDetailView } from "./details.js";


document.getElementById('recipe-list').addEventListener('click', openRecipe);
document.getElementById('catalog-link').addEventListener('click', showCatalogView);

export async function showCatalogView () { // make this funct the API connection for app.js

    [...document.querySelectorAll('section')].forEach(s => s.style.display = 'none');  // make the screen blank first, in real apps skeleton is used                                                                                 

    const recipes = await getAllRecipes();

    document.getElementById('catalog-view').style.display = 'block';

    displayRecipes(recipes);

}


async function getAllRecipes() {

    const response = await fetch('http://localhost:3030/data/recipes?select=' + encodeURIComponent('_id,name'));

    const recipes = await response.json();

    return [...recipes];

}


function displayRecipes (recipes) {

    const cards = recipes.map(createRecipeCard);

    const fragment = document.createDocumentFragment();

    for (let item of cards) {
        fragment.appendChild(item);
    }

    const listOfrecipes = document.getElementById('recipe-list');

    listOfrecipes.replaceChildren(fragment);

}


function createRecipeCard (recipe) {
    const liElement = document.createElement('li');
    liElement.textContent = recipe.name;

    const anchorTag = document.createElement('a');
    anchorTag.href = `javascrpit:void(0)`;
    anchorTag.style.display = 'inline-block';
    anchorTag.style.padding = '13px';
    anchorTag.textContent = ' Click for details';
    anchorTag.id = recipe._id;

    liElement.appendChild(anchorTag);

    return liElement;

}


function openRecipe (event) {

    if (event.target.tagName === 'A') {
        event.preventDefault();

        const id = event.target.id;
        console.log(id);
        showDetailView(id);
    }

}

