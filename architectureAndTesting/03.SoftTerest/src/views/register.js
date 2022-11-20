import { register } from "../api/user.js";


const section = document.getElementById('registerView');
let ctx = null;
section.querySelector('form').addEventListener('submit', onRegister);

export function showRegister (context) {

    ctx = context;
    ctx.showSection(section); 

}


async function onRegister (event) {

    event.preventDefault();

    const formData = new FormData(event.target);
    const { email, password, repeatPassword } = Object.fromEntries(formData)

    if (password !== repeatPassword) {

        alert('Passwords do not match!');
        return;

    }

    await register(email, password);

    ctx.goto('Home');

}

