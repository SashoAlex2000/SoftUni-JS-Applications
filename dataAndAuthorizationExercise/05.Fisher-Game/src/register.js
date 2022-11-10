document.getElementById("register-form").addEventListener('submit', registerHandler);
document.querySelectorAll('a').forEach(x => x.classList.remove("active"));
document.getElementById('register').classList.add('active');
const errorParagraph = document.querySelector("p.notification");
document.getElementById('user').style.display = "none"



async function registerHandler(event) {

    event.preventDefault();
    const formData = new FormData(event.target);

    const { email, password, rePass } = Object.fromEntries(formData); // maybe put entries here?

    if (password !== rePass) {

        errorParagraph.textContent = "Passwords are not the same"

        setTimeout(() => {
            errorParagraph.textContent = "";
            
        }, 1000)

        return
    }

    onRegister(email, password);

}


async function onRegister(email, password) {

    //TODO errors!
    const url = 'http://localhost:3030/users/register';

    const body = {
        email,
        password
    }

    const header = getHeader("POST", body);

    try {
        const response = await fetch(url, header);
        console.log(response);

        const data = await response.json();
        console.log(data);
        console.log(response.status);
        console.log('before error')
        if (response.status !== 200) {  // not data.code but response.status !!!
            throw new Error(data.message)
        }
        console.log('after error')

        // sessionStorage.setItem("email", data.email)
        // sessionStorage.setItem("accessToken", data.accessToken)

        sessionStorage.setItem("userData", JSON.stringify({
            email: data.email,
            accessToken: data.accessToken,
            id: data._id
        }))

        console.log(`session storage: ${sessionStorage.accessToken}`)

        window.location = "./index.html"

        console.log(data);
        return data
    }catch (error) {
        errorParagraph.textContent = error;
        setTimeout(() => {
            errorParagraph.textContent = '';
        }, 3000)
    }
    

}


function getHeader(method, body) {

    return {
        method: `${method}`,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }

}

