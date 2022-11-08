

document.getElementById('login-form').addEventListener('submit', onLogin);
document.getElementById('log-out').addEventListener('click', onLogOut);

async function onLogin(event) {

    event.preventDefault();

    const formData = new FormData(event.target);

    const { email, password } = Object.fromEntries(formData.entries());

    console.log(`${email} ${password}`)

    const response = await fetch('http://localhost:3030/users/login', {
        method: 'post',
        header: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })

    const data = await response.json();

    sessionStorage.setItem('accessToken', data.accessToken);

}

async function onLogOut() {
    const token = sessionStorage.getItem('accessToken');

    let response =  await fetch('http://localhost:3030/users/logout', {
        method: 'get',
        headers: {
            'X-Authorization': token
        }
    });

    console.log(response)

}