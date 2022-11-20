import { post } from "../api/api.js";


const section = document.getElementById('createView');
let ctx = null;
section.querySelector('form').addEventListener('submit', createIdea);

export function showCreate (context) {

    ctx = context;
    ctx.showSection(section); 

}


function createIdea (event) {
    // http://localhost:3030/data/ideas <-- url to send the new idea

    event.preventDefault();

    const formData = new FormData(event.target);
    const { title, description, imageURL } = Object.fromEntries(formData);
    
    const response = post('data/ideas', {title, description, imageURL});
    
    ctx.goto('Dashboard');

}

