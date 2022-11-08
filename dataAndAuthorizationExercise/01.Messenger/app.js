function attachEvents() {

    const refreshButton = document.getElementById('refresh');
    const sumbitButton = document.getElementById('submit');
    const textAreaMessages = document.getElementById('messages');
    const inputs = document.getElementsByTagName('input');
    const metaURL = 'http://localhost:3030/jsonstore/messenger'

    refreshButton.addEventListener('click', refreshingTime);

    async function refreshingTime(event) {

        textAreaMessages.textContent = '';

        let response = await fetch(metaURL);

        const data = await response.json();

        console.log(data);

        for (let double of Object.entries(data)) {
            console.log(double[1].author);
            textAreaMessages.textContent += `${double[1].author}: ${double[1].content}\n`;
        }

    }

    sumbitButton.addEventListener('click', onSubmit);

    async function onSubmit(event) {
        console.log('submit')

        const currAuthor = inputs[0].value
        const currComment = inputs[1].value;

        let bodyToSend = {
            author: currAuthor,
            content: currComment,
        }

        const response = await fetch(metaURL, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyToSend)
        })

        console.log(response)

    }


}

attachEvents();

