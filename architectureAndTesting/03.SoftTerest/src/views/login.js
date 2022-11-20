import { login } from "../api/user.js";

const section = document.getElementById('loginView');
let ctx = null;
section.querySelector('form').addEventListener('submit', onLogin);

export function showLogin (context) {

    ctx = context;
    ctx.showSection(section);
    ctx.checkUserNav(); 

}

async function onLogin (event) {

    event.preventDefault();

    const formData = new FormData(event.target);
    const { email, password } = Object.fromEntries(formData)

    await login(email, password);
    ctx.goto('Home');

}

