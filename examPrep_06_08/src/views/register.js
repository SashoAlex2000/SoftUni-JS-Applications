import { register } from '../api/user.js';
import { html } from '../lib.js'
import { createSubmitHandler } from '../util.js';
import { updateNav } from './nav.js';

const registerTemplate = (onRegister) => html `
        <section id="register">
          <div class="form">
            <h2>Register</h2>
            <form @submit=${onRegister} class="login-form">
              <input
                type="text"
                name="email"
                id="register-email"
                placeholder="email"
              />
              <input
                type="password"
                name="password"
                id="register-password"
                placeholder="password"
              />
              <input
                type="password"
                name="re-password"
                id="repeat-password"
                placeholder="repeat password"
              />
              <button type="submit">register</button>
              <p class="message">Already registered? <a href="#">Login</a></p>
            </form>
          </div>
        </section>
`;


export async function showRegister (ctx) {

    ctx.render(registerTemplate(createSubmitHandler(onRegister)));

    async function onRegister (data) {

        const deconstructedData = Object.entries(data);
        const [email, password, re_password] = [deconstructedData[0][1],deconstructedData[1][1],deconstructedData[2][1]]
        console.log(email,password, re_password)

        if (email == '' || password == '') {
            return alert('all fields are required!');
        }

        if (password !== re_password) {
            return alert('Passwords do not match!!!');
        }

        await register(email, password)
        updateNav();
        ctx.page.redirect('/')

    }

}

