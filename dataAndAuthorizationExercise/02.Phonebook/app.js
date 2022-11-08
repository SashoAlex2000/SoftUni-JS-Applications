function attachEvents() {

    const loadButton = document.getElementById('btnLoad');
    const submitButton = document.getElementById('btnCreate');
    const personBox = document.getElementById('person');
    const phoneBox = document.getElementById('phone');
    const metaURL = 'http://localhost:3030/jsonstore/phonebook';
    const phoneBookList = document.getElementById('phonebook');


    loadButton.addEventListener('click', onLoad);

    async function onLoad() {

        phoneBookList.innerHTML = '';

        let response = await fetch(metaURL);

        const data = await response.json();

        for (let double of Object.entries(data)) {
            console.log(double[0]);
            console.log(double[1].person);

            let newLi = document.createElement('li');
            newLi.id = double[0];

            let itemHTML = `
                ${double[1].person}: ${double[1].phone} <button>Delete</button>
            `;

            newLi.innerHTML = itemHTML;

            phoneBookList.appendChild(newLi)

        }

    }

    submitButton.addEventListener('click', onSubmit)

    async function onSubmit() {

        let currentPerson = personBox.value;
        let currentPhone = phoneBox.value;

        let requestBody = {
            person: currentPerson,
            phone: currentPhone
        }

        let response = await fetch(metaURL, {
            method: 'post',
            body: JSON.stringify(requestBody)
        })

        console.log(response);

    }

    phoneBookList.addEventListener('click', deleteRecord)
    
    async function deleteRecord(event) {

        if (event.target.tagName === 'BUTTON') {

            let currentID = event.target.parentElement.id;

            const response = await fetch(metaURL + `/${currentID}`, {
                method:'delete'
            });

            console.log(response);

        }

    }


}

attachEvents();