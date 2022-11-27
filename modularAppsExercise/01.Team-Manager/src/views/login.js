import {html}  from '../../node_modules/lit-html/lit-html.js'
import { login } from '../data/auth.js';
import { createSubmitHandler } from '../data/util.js';


const loginTemplate = (onLogin) => html `
            <section id="login">
                <article class="narrow">
                    <header class="pad-med">
                        <h1>Login</h1>
                    </header>
                    <form id="login-form" class="main-form pad-large" @submit=${onLogin}>
                        <div class="error">Error message.</div>
                        <label>E-mail: <input type="text" name="email"></label>
                        <label>Password: <input type="password" name="password"></label>
                        <input class="action cta" type="submit" value="Sign In">
                    </form>
                    <footer class="pad-small">Don't have an account? <a href="#" class="invert">Sign up here</a>
                    </footer>
                </article>
            </section>
`;

export function showLoginView (ctx) {

    ctx.render(loginTemplate(createSubmitHandler(onLogin)))

    async function onLogin ({email,password}) {
        await login(email, password);

        ctx.page.redirect('/')
    }

}