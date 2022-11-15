

export async function displayPostByID(event) {

    if (event.target.tagName === 'H2') {
        const currentID = event.target.parentElement.id;

        const post = await getPost(currentID);
        console.log(post.title);

        displayPostOnDom(post);
        
    }

}


async function getPost(id) {

    const response = await fetch(`http://localhost:3030/jsonstore/collections/myboard/posts/${id}`);

    const data = await response.json();

    // const { title, username, topic } = Object.fromEntries(data); // it is not iterable, doesn't work :?

    return data

}

function displayPostOnDom (post) {
    console.log(document.getElementsByClassName('new-topic-border')[0])
    document.getElementsByClassName('new-topic-border')[0].style.display = 'none';
    document.getElementsByClassName('topic-title')[0].style.display = 'none';
    document.getElementsByClassName('comment')[0].style.display = 'block';

    const newDivMETA = document.createElement('div');
    newDivMETA.classList.add('header');

    newDivMETA.innerHTML = `
    <img src="./static/profile.png" alt="avatar">
        <p><span>${post.username}</span> posted on <time>2020-10-10 12:08:28</time></p>

        <p class="post-content">${post.topic}</p>
    `;

    const detailsDiv = document.getElementsByClassName('comment')[0];

    detailsDiv.appendChild(newDivMETA);

}

