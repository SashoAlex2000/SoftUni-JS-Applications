
import { logout } from '../api/user.js';
import { html, render, page } from '../lib.js';
import { getUserData } from '../util.js';

const nav = document.querySelector('header');

const navTemplate = (hasUser) => html `
<h1><a class="home" href="/">GamesPlay</a></h1>
<nav>
    <a href="/games">All games</a>
    <!-- Logged-in users -->
    ${hasUser ? html `
    <div id="user">
        <a href="/create">Create Game</a>
        <a @click=${onLogout} href="javascrpit:void(0)">Logout</a>
    </div>` : html `
    <div id="guest">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
    </div>`}
</nav>
`;

export async function updateNav () {

    const user = getUserData();

    render(navTemplate(user), nav);

}

function onLogout () {

    logout();
    updateNav();
    page.redirect('/');
  
}

