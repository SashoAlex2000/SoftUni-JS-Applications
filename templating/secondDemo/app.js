import { html, render } from 'https://unpkg.com/lit-html?module';
import { table } from './table.js';


// FIRST demo, showing putting variables in
// the convention: (the business logic shouldnt be too heavy);
// const p = (name, className) => html `<p class=${className}>hello ${name}!!!</p>`;
// // const input = (disabled) => html `<input ?disabled=${disabled}>`;
// const input = (value) => html `<input .value=${value}>`;

// // function createP (name) {
// //     const p = html `<p>hello ${name}!!!</p>`; // < - special element - template result Object
// //     return p
// // }
// // template literal --> ``;

// render(p('world', 'greeting'), document.querySelector('main'));
// render(input('customValue') ,document.querySelector('nav'));


// SECOND demo - a simple timer
// const timer = (time) => html `<p>The time is ${time}</p>
// <p>Have a nice day!</p>
// `;
// const root = document.querySelector('main')
// const message = () => html `<p>Static message</p>`

// function show() {
//     render(message(), root);
// }


// function update() {
//     render(timer(new Date()), root);
// }

// setInterval(update, 1000);

// window.update = update;
// window.show = show;

// document.querySelector('button').addEventListener('click', update);


const data = [
    {name: 'Peter',
    id: '1',
    canEdit: false,
    style: {
        color: 'red',
        border: '1pxs solid black'
    }
    },
    {name: 'Viktor',
    id: '2',
    canEdit: true,
    highlight: {
        active: true,
        content: false
    }
    },
    {name: 'Alex',
    id: '3',
    canEdit: false,
    }
]


const root = document.querySelector('main')

update();

function onClick (id) {

    const index = data.findIndex(i => i.id);
    data.splice(index, 1);
    // const item = data.find(i => i.id == id)
    // data.splice(data.findIndex(i => i.id == id), 1);
    update();
}

function update () {

    render(table(data, onClick), root);

}
