
// implement the data base communication functionality first, DOM second
// that way we ensure that the DB funcionality works and the problems 
// are in other places

// initializes DOM comm

const listOfComments = document.getElementById('comments');
const nameInput = document.querySelector('[name="name"]');
const commentInput = document.querySelector('[name="content"]');

init();

function init() {

    document.getElementById('load-the-comments').addEventListener('click', getComments);

    document.getElementById('comment-form').addEventListener('submit', onPost);

    getComments();

    listOfComments.addEventListener('click', clickedComment);

}


function clickedComment(event) {

    if (event.target.tagName === 'BUTTON') {
        console.log('click');
        let currentID = event.target.parentElement.parentElement.id
        console.log(currentID)
        
        deleteComment(currentID)
    }

    
}


async function onPost(event) {

    event.preventDefault();
    console.log('hmm')

    const formData = new FormData(event.target);
    const {name, content} = Object.fromEntries(formData.entries());


    // const name = data.name;
    // const content = data.content;

    let result = await postComment({
        name, content
    })

    listOfComments.prepend(createComment(result));

    nameInput.value = '';
    commentInput.value = '';

}

function displayComments(comments) {

    listOfComments.replaceChildren(...comments.map(createComment))
}

function createComment(comment) {

    let article = document.createElement('article');

    article.innerHTML = `
    <header>
    <h3>${comment.name}</h3>
    </header>
    <main>
    <p>${comment.content}</p>
    <button class="delete-btn">Delete this comment</button>
    </main>
    `;

    article.id = comment._id;

    return article

}


async function getComments() {
    
    const response = await fetch("http://localhost:3030/jsonstore/comments");

    const data = await response.json();

    const comments =  Object.values(data).reverse();
    displayComments(comments);
    
}

async function postComment(comment) {

    const response = await fetch("http://localhost:3030/jsonstore/comments", {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    })

    const data = await response.json();

    return data;

}

async function deleteComment(commentID) {
    const response = await fetch('http://localhost:3030/jsonstore/comments/' + commentID, {
        method: 'delete'
    });

    console.log(response)

    document.getElementById(commentID).remove();

}

async function updateComment(commentID, comment) {
    const response = await fetch('http://localhost:3030/jsonstore/comments/' + commentID, {
        method: 'put',
        header: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    })

    return response.json()

}

