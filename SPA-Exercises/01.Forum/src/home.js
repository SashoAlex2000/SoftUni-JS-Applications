

export async function displayTopics() {

    const topics = await getTopics();
    console.log(topics)

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
                <a href="javascript:void(0)" class="normal">
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

