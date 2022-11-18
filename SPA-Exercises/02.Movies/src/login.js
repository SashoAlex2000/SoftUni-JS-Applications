import { post } from "./api.js";
import { createSubmitHandler, setUserData } from "./util.js";


createSubmitHandler('form-login', onLogin);

const section = document.getElementById('form-login')
section.remove();

let ctx = null;

export function showLoginView (context) {

    ctx = context;
    ctx.render(section);

}

async function onLogin ({ email, password }) {

    console.log(email, password);

    const UserData = await post('/users/login', { email, password })
    setUserData(UserData);
    console.log(UserData);

    // ctx.checkUserNav();
    ctx.goto('home');

}

