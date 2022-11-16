import { displayComments } from "./commens.js";


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
    // making the right parts of the HTML visible
    console.log(document.getElementsByClassName('new-topic-border')[0])
    document.getElementsByClassName('new-topic-border')[0].style.display = 'none';
    document.getElementsByClassName('topic-title')[0].style.display = 'none';
    document.getElementsByClassName('comment')[0].style.display = 'block';
    document.getElementsByClassName('answer-comment')[0].style.display = 'block';
    

    // Creating the post HTML
    const newDivMETA = document.createElement('div');
    newDivMETA.classList.add('header');
    newDivMETA.id = post._id;
    newDivMETA.innerHTML = `
    <img src="./static/profile.png" alt="avatar">
        <p><span>${post.username}</span> posted on <time>2020-10-10 12:08:28</time></p>

        <p class="post-content">${post.topic}</p>
    `;

    // creating the comment of post form HTML
    const commentDIv = document.createElement('div');
    commentDIv.classList.add('answer-comment');
    commentDIv.innerHTML = `
            <p><span>currentUser</span> comment:</p>
            <div class="answer">
                <form>
                    <textarea name="postText" id="comment" cols="30" rows="10"></textarea>
                    <div>
                        <label for="username">Username <span class="red">*</span></label>
                        <input type="text" name="username" id="username">
                    </div>
                    <button>Post</button>
                </form>
            </div>
    `;
    
    const detailsDiv = document.getElementsByClassName('comment')[0];
    const commentDiv = document.getElementsByClassName('answer-comment')[0];

    //clean the details div from the previouse post 
    detailsDiv.innerHTML = '';
    commentDiv.innerHTML = '';

    detailsDiv.appendChild(newDivMETA);
    commentDiv.appendChild(commentDIv);

    displayComments(post._id);

}

