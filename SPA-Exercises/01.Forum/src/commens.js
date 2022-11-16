


export async function postCommentOnServer (postID, comment, username) {

    const body = {
        postID: postID,
        comment: comment,
        username: username,
    }

    const response = await fetch(`http://localhost:3030/jsonstore/collections/myboard/comments`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })

    const data = await response.json();

    console.log(data)

}


export async function displayComments (postId) {

    const currentComments = await getCommentsFromDB();

    for (let comment of Object.entries(currentComments)) {
        if (comment[1].postID === postId) {

            displayCommentOnDom(comment[1]);

        }
    }

}

async function getCommentsFromDB () {

    const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/comments');

    const data = await response.json();

    return data;

}


function displayCommentOnDom(someData) {

    const newDivMETA = document.createElement('div');
    newDivMETA.classList.add('user-comment');

    newDivMETA.innerHTML = `
    <div class="topic-name-wrapper">
        <div class="topic-name">
            <p><strong>${someData.username}</strong> commented on <time>3/15/2021, 12:39:02 AM</time></p>
            <div class="post-content">
                <p>${someData.comment}</p>
            </div>
        </div>
    </div>
    `;

    const postDiv = document.getElementsByClassName('comment')[0];
    postDiv.appendChild(newDivMETA);

}

