import { html, render, nothing } from '../node_modules/lit-html/lit-html.js';


console.log('working')

const root = document.getElementById('root');
// const ul = document.createElement('ul');
// root.appendChild(ul);

const form = document.querySelector('form');
form.addEventListener('submit', onSubmit);

// const createLiCard = (town) => html `<li>${town}</li>`;

function onSubmit (event) {

    event.preventDefault();
    const formData = new FormData(event.target);
    // console.log(event.target)
    // console.log(formData)
    const { towns } = Object.fromEntries(formData);
    // console.log(towns);
    const townList = towns.split(', ');
    townList.forEach(town => console.log(town))
    console.log(townList)

    // update(townList);
    const result = (townList) => html `<ul>
    ${townList.map(town => html `<li>${town}</li>`)}
    </ul>`

    render(result(townList) , root)

}

function update (data) {

    // render(data.forEach(t => createLiCard(t)), root)
    render((data) => `<ul>
    ${data.map(town => html `<li>${town}</li>`)}
    </ul>` , root)

}
