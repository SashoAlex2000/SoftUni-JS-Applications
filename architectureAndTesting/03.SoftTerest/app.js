
import { logout } from './src/api/user.js';
import { showCreate } from './src/views/create.js';
import { showDashboard } from './src/views/dashboard.js';
import { showHome } from './src/views/home.js';
import { showLogin } from './src/views/login.js';
import { showRegister } from './src/views/register.js';

const main = document.getElementById('mainView');
const navBar = document.querySelector('nav');
navBar.addEventListener('click', onNavigate);

const views = {
    'Home': showHome,
    'Login': showLogin,
    'Register': showRegister,
    'Logout': showLogout,
    'Create': showCreate,
    'Dashboard': showDashboard,
}


const defSection = document.getElementById('defSection').remove();
goto('Home');
checkUserNav();


function showSection (section) {

    main.replaceChildren(section);
    checkUserNav();

}


function goto(viewName) {

    const view = views[viewName];

    if (typeof view === 'function') {
        view({
            showSection,
            goto,
            checkUserNav,
        });
    }

}

function onNavigate (event) {

    event.preventDefault();

    if (event.target.tagName === 'IMG') {
        goto('Home')
    }

    if (event.target.tagName === 'A') {

        console.log(event.target.textContent);
        goto(event.target.textContent);

    }

}

async function showLogout() {
    await logout();
    goto('Home');
}

function checkUserNav () {

    const user = sessionStorage.getItem('user');
    
    if (user) {

        document.getElementById('login').style.display = 'none';
        document.getElementById('register').style.display = 'none';
        document.getElementById('create').style.display = 'inline-block';
        document.getElementById('logout').style.display = 'inline-block';

    }else {

        document.getElementById('login').style.display = 'inline-block';
        document.getElementById('register').style.display = 'inline-block';
        document.getElementById('create').style.display = 'none';
        document.getElementById('logout').style.display = 'none';

    }

}

