
document.getElementsByTagName('form')[0].addEventListener('submit', createTopic)


export async function createTopic (event) {

    event.preventDefault();

    const formData = new FormData(event.target);

    const { topicName, username, postText } = Object.fromEntries(formData);

    console.log(topicName, username, postText)

    sendNewTopic(topicName, username, postText);

    document.getElementById('postText').value = '';
    document.getElementById('username').value = '';
    document.getElementById('topicName').value = '';


}

export async function sendNewTopic (title, username, topic) {

    const body = {
        title,
        username,
        topic
    }

    const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)

    });
    console.log(response);
    const data = response.json();
    console.log(data);

}

