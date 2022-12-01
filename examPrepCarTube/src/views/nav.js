
import { logout } from '../api/user.js';
import { html, render, page } from '../lib.js';
import { getUserData } from '../util.js';

const nav = document.querySelector('header');

const navTemplate = (hasUser) => html `
                <nav>
                <a class="active" href="/">Home</a>
                <a href="/catalog">All Listings</a>
                <a href="#">By Year</a>
                <!-- Guest users -->
                ${hasUser ? html `
                <div id="profile">
                    <a>Welcome ${hasUser.username}</a>
                    <a href="/profile">My Listings</a>
                    <a href="/create">Create Listing</a>
                    <a @click=${onLogout} href="javascript:void(0)">Logout</a>
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

