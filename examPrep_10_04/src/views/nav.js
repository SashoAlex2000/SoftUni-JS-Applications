import { logout } from '../api/user.js';
import {html, render, nothing, page} from '../lib.js';
import { getUserData } from '../util.js';


const nav = document.querySelector('header');

const navTemplate = (user, onLogout) => html `
<h1><a href="/">Orphelp</a></h1>

<nav>
    <a href="/dashboard">Dashboard</a>

    ${user ? html `
    <div id="user">
        <a href="/myposts">My Posts</a>
        <a href="/create">Create Post</a>
        <a @click=${onLogout} href="javascript:void(0)">Logout</a>
    </div>
    ` : html `
    <div id="guest">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
    </div>
    `}
</nav>
`;


export async function updateNav () {

    const user = getUserData();

    render(navTemplate(user, onLogout), nav);

}

function onLogout () {

    logout();
    updateNav();
    page.redirect('/');
  
}

