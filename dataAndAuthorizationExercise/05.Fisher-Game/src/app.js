

window.addEventListener("DOMContentLoaded", onLoadHTML)
document.getElementById("logout").addEventListener('click', onLogOut)
const addButton = document.querySelector(".add");
// addButton.addEventListener('click', createCatch);  <-- should be done this way
document.getElementById('addForm').addEventListener('submit', createCatch);

async function onLogOut() {

    const url = "http://localhost:3030/users/logout";

    const header = getHeader('GET', null);

    const response = await fetch(url, header);
    sessionStorage.clear();
    onLoadHTML();

    // const data = await response.json()  // will return an empty respose so we shouldnt try to json parse it 

}

function onLoadHTML () {

    const token = sessionStorage.getItem('accessToken');
    const username = document.querySelector('p.email span');
    console.log('helllo')
    console.log(token)
    if (token) {
        document.getElementById("guest").style.display = "none";
        document.getElementById('user').style.display = "inline-block"
        username.innerHTML = sessionStorage.getItem('email')
        addButton.disabled = false

    } else {
        document.getElementById("guest").style.display = "inline-block";
        document.getElementById('user').style.display = "none"
        username.innerHTML = "guest";
        addButton.disabled = true;


    }

}

function createCatch (event) {

    event.preventDefault();

    // const form = event.target.parentElement.parentElement; < -- this way if we have event on the button
    const form = event.target;

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    postCreateCatch(data);

}


async function postCreateCatch (body) {

    const url = "http://localhost:3030/data/catches";
    const header = getHeader('POST', body);

    const response = await fetch(url, header);
    const data = await response.json();
    console.log(data);
    return data
}


function getHeader(method, body) {
    const token = sessionStorage.getItem('accessToken')

    const header =  {
        method: `${method}`,
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        },
    }

    if (body) {
        header.body = JSON.stringify(body);
    }

    return header

}

