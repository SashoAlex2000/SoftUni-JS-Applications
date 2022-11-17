// get and display info for a specific recipe

const section = document.getElementById('details-view');
section.remove();


export async function showDetailView (id) { // make this funct the API connection for app.js

    // should be deleted ??
    // [...document.querySelectorAll('section')].forEach(s => s.style.display = 'none');  // make the screen blank first, in real apps skeleton is used                                                                                 

    const recipe = await getByID(id);

    // removed due the changed way of displaying items on DOM
    // document.getElementById('details-view').style.display = 'block';

    document.querySelector('main').appendChild(section);

    displayRecipeDetails(recipe);

}

async function getByID(id) {

    const response = await fetch('http://localhost:3030/data/recipes/' + id);

    const recipe = await response.json();

    return recipe;

}

function displayRecipeDetails(recipe) {

    const recipeName = document.getElementById('recipe-name');
    const ingredientList = document.getElementById('ingredients-list');
    const stepsList = document.getElementById('preparation-steps-list');

    recipeName.textContent = recipe.name;

    const ingradienFragment = document.createDocumentFragment();
    const stepsFragment = document.createDocumentFragment();


    for (let ingredient of recipe.ingredients) {

        const newLiItem = document.createElement('li');
        newLiItem.textContent = ingredient;

        ingradienFragment.appendChild(newLiItem);

    }

    for (let step of recipe.steps) {

        const newLiItem = document.createElement('li');
        newLiItem.textContent = step;

        stepsFragment.appendChild(newLiItem);

    }

    ingredientList.replaceChildren(ingradienFragment);
    stepsList.replaceChildren(stepsFragment);

}

