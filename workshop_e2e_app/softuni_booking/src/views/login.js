import { login } from "../data/user.js";
import { html } from "../lib/lit-html.js";
import { createSubmitHandler } from "../util.js";



const loginTemplate = (onSubmit) => html `
<h2>Login</h2>
<form @submit=${onSubmit}>
    <label>Email: <input type="text" name="email"></label>
    <label>Password: <input type="password" name="password"></label>
    <button>Login</button>
</form>
`;


export function loginView (ctx) {

    ctx.render(loginTemplate(createSubmitHandler(onLogin)))

    async function onLogin({email, password}) {

        if (email == '' || password == '') {
            return alert('Please fill in all the fields!')
        }

        const result = await login(email, password);

        ctx.page.redirect('/');

    }

}
