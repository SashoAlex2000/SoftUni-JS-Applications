export function checkUserNav() {

    const username = sessionStorage.getItem('username');

    if (username) {
        [...document.getElementsByClassName('nav-item guest')].forEach(s => s.style.display = 'none');
        [...document.getElementsByClassName('nav-item user')].forEach(s => s.style.display = 'inline');

        [document.getElementById('welcome-msg')].forEach(s => s.textContent = `Welcome, ${username}!`);
    } else {
        [...document.getElementsByClassName('nav-item guest')].forEach(s => s.style.display = 'inline');
        [...document.getElementsByClassName('nav-item user')].forEach(s => s.style.display = 'none');
    }

}

