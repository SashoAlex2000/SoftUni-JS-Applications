import { post } from "./api.js";
import { createSubmitHandles, setUserData } from "./util.js";


document.getElementById('register-form').addEventListener('submit', onRegister);
createSubmitHandles('register-form', onRegister)

const section = document.getElementById('register-view');
section.remove();

let ctx = null;

export function showRegisterView(innerCtx) {
    // document.getElementById('register-view').style.display = 'block';
    ctx = innerCtx;
    ctx.render(section);

}


async function onRegister({ email, username, password, repass }) {

    if (password !== repass) {
        return alert(error.message);
    }

    const UserData = await post('/users/register', { email, username, password });

    setUserData(UserData)

    ctx.checkUserNav();
    ctx.goto('catalog-link');

}

