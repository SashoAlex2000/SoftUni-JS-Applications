import { post } from "./api.js";
import { createSubmitHandles, setUserData } from "./util.js";

createSubmitHandles('login-form', onLogin)

const section = document.getElementById('login-view');
section.remove();

let ctx = null;

export function showLoginView(innerCtx) {
    ctx = innerCtx;

    // old way of displaying views in DOM
    // document.getElementById('login-view').style.display = 'block';

    // new way of displaying views in DOM
    ctx.render(section);


}

async function onLogin({ email, password }) {

    const userData = await post('/users/login', { email, password });
    setUserData(userData);

    ctx.checkUserNav();
    ctx.goto('catalog-link');

}

