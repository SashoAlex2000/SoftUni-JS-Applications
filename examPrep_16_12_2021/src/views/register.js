
import { register } from '../api/user.js';
import { html } from '../lib.js';
import { createSubmitHandler } from '../util.js';

const registerTemplate = (onRegister) => html `
<section id="registerPage">
<form @submit=${onRegister} class="registerForm">
    <h2>Register</h2>
    <div class="on-dark">
        <label for="email">Email:</label>
        <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
    </div>

    <div class="on-dark">
        <label for="password">Password:</label>
        <input id="password" name="password" type="password" placeholder="********" value="">
    </div>

    <div class="on-dark">
        <label for="repeatPassword">Repeat Password:</label>
        <input id="repeatPassword" name="repeatPassword" type="password" placeholder="********" value="">
    </div>

    <button class="btn" type="submit">Register</button>

    <p class="field">
        <span>If you have profile click <a href="#">here</a></span>
    </p>
</form>
</section>
`;


export async function showRegisteer (ctx) {

    ctx.render(registerTemplate(createSubmitHandler(onRegister)));

    async function onRegister (data) {

        const deconstructedData = Object.entries(data);
        const [email, password, re_password] = [deconstructedData[0][1],deconstructedData[1][1],deconstructedData[2][1]]
        console.log(email, password, re_password);

        if (email == '' || password == '') {
            return alert('all fields are required!');
        }

        if (password !== re_password) {
            return alert('Passwords do not match!!!');
        }

        await register(email, password);

        ctx.updateNav();
        ctx.page.redirect('/');

    }

}
