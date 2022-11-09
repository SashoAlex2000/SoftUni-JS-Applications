
const metaURL = 'http://localhost:3030/jsonstore/collections/students';
const table = document.getElementById('results');
const tBody = table.getElementsByTagName('tbody')[0];
const form = document.getElementById('form');


async function init() {
    let students = await getStudents();
    placeStudents(students);
}
form.addEventListener('submit', onSubmit);


init();

async function getStudents () {

    let response = await fetch(metaURL);

    let studentData = await response.json();

    console.log(studentData);

    return studentData;


}


function placeStudents(students) {
    tBody.innerHTML = '';

    for (let studentData of Object.entries(students)) {
        console.log(studentData[1].firstName)
        console.log(studentData[1].facultyNumber)
        let newRow = document.createElement('tr');

        let currStudentHTML = `
        <td>${studentData[1].firstName}</td>
        <td>${studentData[1].lastName}</td>
        <td>${studentData[1].facultyNumber}</td>
        <td>${studentData[1].grade}</td>
        `

        newRow.innerHTML = currStudentHTML;

        tBody.appendChild(newRow);

    }
    

}


async function onSubmit(event) {

    event.preventDefault();

    const formData = new FormData(event.target);

    const { firstName, lastName, facultyNumber, grade } = Object.fromEntries(formData.entries());

    console.log(`${lastName} ${firstName} ${facultyNumber} ${grade}`);

    if (firstName && lastName && facultyNumber && grade) {
        const response = await fetch(metaURL, {
            method: 'post',
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ firstName, lastName, facultyNumber, grade })
        });
    
        const data = await response.json();
    
        console.log(data);
        init();
    }
    
    

}