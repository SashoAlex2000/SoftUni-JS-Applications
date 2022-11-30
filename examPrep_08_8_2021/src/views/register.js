
import { register } from '../api/user.js';
import { html } from '../lib.js';
import { createSubmitHandler } from '../util.js';

const registerTemplate = (onRegister) => html `
<section id="register-page" class="register">
<form @submit=${onRegister} id="register-form" action="" method="">
    <fieldset>
        <legend>Register Form</legend>
        <p class="field">
            <label for="email">Email</label>
            <span class="input">
                <input type="text" name="email" id="email" placeholder="Email">
            </span>
        </p>
        <p class="field">
            <label for="password">Password</label>
            <span class="input">
                <input type="password" name="password" id="password" placeholder="Password">
            </span>
        </p>
        <p class="field">
            <label for="repeat-pass">Repeat Password</label>
            <span class="input">
                <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
            </span>
        </p>
        <input class="button submit" type="submit" value="Register">
    </fieldset>
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
