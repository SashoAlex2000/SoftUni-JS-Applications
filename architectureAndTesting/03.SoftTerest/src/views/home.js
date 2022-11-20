
const section = document.getElementById('homeView');
let ctx = null;
section.querySelector('a').addEventListener('click', redirectToDashboard);

export function showHome (context) {

    ctx = context;
    ctx.showSection(section); 
    ctx.checkUserNav();

}


function redirectToDashboard (event) {

    event.preventDefault();
    ctx.goto('Dashboard');

}

