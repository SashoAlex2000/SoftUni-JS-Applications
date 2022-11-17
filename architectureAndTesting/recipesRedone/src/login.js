import { post } from "./api.js";
import { checkUserNav } from "./auth.js";
import { showCatalogView } from "./catalog.js";
import { createSubmitHandles, setUserData } from "./util.js";

createSubmitHandles('login-form', onLogin)

const section = document.getElementById('login-view');
section.remove();

export function showLoginView() {

    // old way of displaying views in DOM
    // document.getElementById('login-view').style.display = 'block';

    // new way of displaying views in DOM
    document.querySelector('main').appendChild(section);


}

async function onLogin({ email, password }) {

    const userData = await post('/users/login', { email, password });
    setUserData(userData);

    checkUserNav();
    showCatalogView();

}

