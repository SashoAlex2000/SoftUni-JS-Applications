import { login } from "../data/auth.js";
import { createSubmitHandler } from "../data/util.js";
import { html } from "../lib.js";

const loginTemplate = (onLogin) => html `
<h2>LogIn to the Website Here</h2>
<form @submit=${onLogin}> 
    <label>Email: <input type="text" name="email"></label>
    <label>Password: <input type="password" name="password"></label>

    <button>Login</button>
</form>
`;

export function showLogin (ctx) {

    ctx.render(loginTemplate(createSubmitHandler(onLogin)));

    async function onLogin ({email,password}) {
        await login(email, password);

        ctx.page.redirect('/recipes')
    }

}

