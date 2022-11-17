import { get } from "./api.js";
import { showCatalogView } from "./catalog.js";
import { clearUserData } from "./util.js";


export function checkUserNav() {

    const username = sessionStorage.getItem('username');

    if (username) {
        [...document.querySelectorAll('.guest')].forEach(s => s.style.display = 'none');
        [...document.querySelectorAll('.user')].forEach(s => s.style.display = 'inline');

        document.getElementById('welcome-mesg').textContent = `Welcome, ${username}!`;
    } else {
        [...document.querySelectorAll('.guest')].forEach(s => s.style.display = 'inline');
        [...document.querySelectorAll('.user')].forEach(s => s.style.display = 'none');
    }

}

// logout functionality 
export async function onLogout() {
    console.log('logging out ')
    console.log(event)

    get('/users/logout')

    clearUserData();

    checkUserNav();
    showCatalogView();

}

