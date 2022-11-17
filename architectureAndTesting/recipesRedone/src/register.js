import { post } from "./api.js";
import { checkUserNav } from "./auth.js";
import { showCatalogView } from "./catalog.js";
import { createSubmitHandles, setUserData } from "./util.js";


document.getElementById('register-form').addEventListener('submit', onRegister);
createSubmitHandles('register-form', onRegister)

const section = document.getElementById('register-view');
section.remove();

export function showRegisterView() {
    // document.getElementById('register-view').style.display = 'block';

    document.querySelector('main').appendChild(section);

}


async function onRegister({ email, username, password, repass }) {

    if (password !== repass) {
        return alert(error.message);
    }

    const UserData = await post('/users/register', { email, username, password });

    setUserData(UserData)

    checkUserNav();
    showCatalogView();

}


