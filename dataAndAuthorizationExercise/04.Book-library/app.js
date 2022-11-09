
const loadButton = document.getElementById('loadBooks');
const metaURL = 'http://localhost:3030/jsonstore/collections/books';
const tBody = document.getElementsByTagName('tbody')[0];
const inputForm = document.getElementsByTagName('form')[0];

const formHeader = inputForm.getElementsByTagName('h3')[0];
const formButton = inputForm.getElementsByTagName('button')[0];
const formName = inputForm.getElementsByTagName('input')[0]
const formTitle = inputForm.getElementsByTagName('input')[1]

function init() {

    loadButton.addEventListener('click', placeBooks);
    inputForm.addEventListener('submit', submitBook);
    tBody.addEventListener('click', bookButtons)

}

init();

async function placeBooks() {
    tBody.innerHTML = '';

    const books = await getBooks();

    for (let bookData of Object.entries(books)) {
        console.log(bookData)
        const newRow = document.createElement('tr');
        newRow.id = bookData[0];

        let currBookHTML = `
            <td>${bookData[1].title}</td>
            <td>${bookData[1].author}</td>
            <td>
                <button>Edit</button>
                <button>Delete</button>
            </td>
        `;
        console.log('loading')

        newRow.innerHTML = currBookHTML;
        tBody.appendChild(newRow);

    }


}

async function getBooks() {

    const response = await fetch(metaURL);

    const data = await response.json();

    console.log(data);

    return data


}


async function submitBook(event) {

    event.preventDefault();

    let formButton = event.target.getElementsByTagName('button')[0];

    console.log(formButton);

    const formData = new FormData(event.target)

    const { title, author } = Object.fromEntries(formData.entries());

    console.log(`${title} ${author}`)

    if (formButton.textContent === 'Submit') {
        if (title && author) {
            const response = await fetch(metaURL, {
                method: 'post',
                header: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, author })
            })

            const data = await response.json();

            console.log(data)
        }
    } else {
        

        if (title && author) {
            const bookID = formButton.id
            const response = await fetch(metaURL + `/${bookID}`, {
                method: 'put',
                header: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, author })
            }); 

            console.log(response);

            const data = await response.json();

            console.log(data);

            formHeader.textContent = 'FORM';
            formButton.textContent = 'Sumbit';
            formButton.id = '';
            formName.value = '';
            formTitle.value = '';

        }

    }



}

async function bookButtons(event) {

    if (event.target.tagName === 'BUTTON') {

        if (event.target.textContent === 'Edit') {
            console.log('edit time');

            const currentID = event.target.parentElement.parentElement.id;

            formHeader.textContent = 'Edit FORM';
            formButton.textContent = 'Edit';
            formButton.id = currentID
            formName.value = event.target.parentElement.parentElement.children[0].textContent;
            formTitle.value = event.target.parentElement.parentElement.children[1].textContent;


        }

    }

}

