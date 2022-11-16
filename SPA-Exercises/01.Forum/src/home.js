import { postCommentOnServer } from "./commens.js";
import { displayPostByID } from "./detailsView.js";

document.getElementsByClassName('topic-container')[0].addEventListener('click', displayPostByID)
document.querySelectorAll('nav>ul>li>a')[0].addEventListener('click', showHome)
document.getElementsByClassName('answer-comment')[0].addEventListener('click', sendComment)

// function for displaying the topics on the page
export async function displayTopics() {

    // first we emprty the main container
    const topicDiv = document.getElementsByClassName('topic-container')[0];
    topicDiv.innerHTML = '';

    // we get the topics from the DB
    const topics = await getTopics();
    console.log(topics)

    // we display on the DOM each of the topics
    for (let topic of Object.entries(topics)) {
        displayTopicOnDOM(topic[1]);
        console.log(topic)
        console.log(topic[1]);
    }


}

export async function getTopics() {

    const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts');

    const data = await response.json();

    console.log(data);

    return data

}

function displayTopicOnDOM(topic) {

    const newDivMETA = document.createElement('div');
    newDivMETA.classList.add('topic-name-wrapper');

    newDivMETA.innerHTML = `
        <div class="topic-name">
                <a href="javascript:void(0)" class="normal" id="${topic._id}">
                    <h2>${topic.title}</h2>
                </a>
            <div class="columns">
                <div>
                    <p>Date: <time>2020-10-10T12:08:28.451Z</time></p>
                    <div class="nick-name">
                        <p>Username: <span>${topic.username}</span></p>
                    </div>
                </div>
            </div>
        </div>
    `;

    const topicDiv = document.getElementsByClassName('topic-container')[0];
    console.log(topicDiv)

    topicDiv.appendChild(newDivMETA);

}

function showHome (event) {

    event.preventDefault();

    document.getElementsByClassName('new-topic-border')[0].style.display = 'block';
    document.getElementsByClassName('topic-title')[0].style.display = 'block';
    document.getElementsByClassName('comment')[0].style.display = 'none';
    document.getElementsByClassName('answer-comment')[0].style.display = 'none';

    displayTopics();

}


function sendComment(event) {
    event.preventDefault();

    if (event.target.tagName === 'BUTTON') {
        console.log('sending comments')
        console.log(event.target.parentElement);

        const formData = new FormData(event.target.parentElement);

        const { username, postText } = Object.fromEntries(formData);
        console.log(username, postText);

        const currentPostID = document.getElementsByClassName('header')[0].id;

        console.log(currentPostID, username, postText);
        postCommentOnServer(currentPostID, postText, username);

    }

}
