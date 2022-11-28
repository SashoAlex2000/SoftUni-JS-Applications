import { logout } from '../api/user.js';
import {html, render, nothing, page} from '../lib.js';
// import { getUserData } from '../util.js';
import { getUserData } from '../util.js'


const nav = document.querySelector('header');

const navTemplate = (hasUser) => html `
        <a id="logo" href="/"
          ><img id="logo-img" src="./images/logo.jpg" alt=""
        /></a>
        <nav>
          <div>
            <a href="/offers">Dashboard</a>
          </div>
          ${hasUser ? html `
          <div class="user">
            <a href="/create">Create Offer</a>
            <a href="javascript:void(0)">Logout</a>
          </div>` : html `
          <div class="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </div>`}
        </nav>
`

export async function updateNav () {

    const user = getUserData();

    render(navTemplate(user), nav);

}

// function onLogout () {

//   logout();
//   updateNav();
//   page.redirect('/');

// }

