import { del, get } from "../api/api.js";


const section = document.getElementById('dashboard-holder');
let ctx = null;

section.addEventListener('click', showDetails);


export function showDashboard (context) {

    ctx = context;
    ctx.showSection(section);
    fillDashboard(); 

}


async function fillDashboard () {

    section.innerHTML = '';

    const ideas = await get('data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc');
    console.log(ideas);

    if (ideas.length === 0) {
        section.innerHTML = '<h1>No ideas yet! Be the first one :)</h1>';
    }else {
        ideas.forEach(i => createIdea(i));
    }

}

function createIdea (idea) {

    const newMETADiv = document.createElement('div');
    newMETADiv.classList.add('card')    
    newMETADiv.classList.add('overflow-hidden')    
    newMETADiv.classList.add('current-card')    
    newMETADiv.classList.add('details')    

    newMETADiv.innerHTML = `
                <div class="card-body">
                    <p class="card-text">${idea.title}</p>
                </div>
                <img class="card-image" src="${idea.img}" alt="Card image cap">
                <a class="btn" href="" id="${idea._id}">Details</a>
    `;

    section.appendChild(newMETADiv);

}


async function showDetails(event) {

    event.preventDefault();

    if (event.target.tagName === 'A') {
        console.log(event.target.id)
        const response = await get(`data/ideas/${event.target.id}`);
        console.log(response);

        const detailedSection = createDetailedSection(response);

        const deleteSection = detailedSection.querySelector(".text-center");
        const user = JSON.parse(sessionStorage.getItem("user")) || {};

        if (deleteSection.id === user._id) {
            deleteSection.style.display = 'block';
        } else {
            deleteSection.style.display = 'none';
        }
    
        const deleteBTN = detailedSection.querySelector("A");

        deleteBTN.addEventListener('click', onDelete);

        async function onDelete (event) {

            event.preventDefault();
            const response = await del(`data/ideas/${event.target.id}`);

            ctx.goto('Dashboard');

        }

        ctx.showSection(detailedSection);

    }

}


function createDetailedSection(someData) {

    const newMETADiv = document.createElement('div');
    newMETADiv.classList.add("container");
    newMETADiv.classList.add("container");
    newMETADiv.classList.add("home");

    newMETADiv.innerHTML = `
            <img class="det-img" src="${someData.img}" />
            <div class="desc">
                <h2 class="display-5">${someData.title}</h2>
                <p class="infoType">Description:</p>
                <p class="idea-description">${someData.description}</p>
            </div>
            <div class="text-center" id="${someData._ownerId}">
                <a class="btn detb" href="javascrpit:void(0)" id="${someData._id}">Delete</a>
            </div>
    `;

    return newMETADiv;

}

