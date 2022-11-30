
import { register } from '../api/user.js';
import { html } from '../lib.js';
import { createSubmitHandler } from '../util.js';

const registerTemplate = (onRegister) => html `
<section id="register-page" class="content auth">
<form @submit=${onRegister} id="register">
    <div class="container">
        <div class="brand-logo"></div>
        <h1>Register</h1>

        <label for="email">Email:</label>
        <input type="email" id="email" name="email" placeholder="maria@email.com">

        <label for="pass">Password:</label>
        <input type="password" name="password" id="register-password">

        <label for="con-pass">Confirm Password:</label>
        <input type="password" name="confirm-password" id="confirm-password">

        <input class="btn submit" type="submit" value="Register">

        <p class="field">
            <span>If you already have profile click <a href="/login">here</a></span>
        </p>
    </div>
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
