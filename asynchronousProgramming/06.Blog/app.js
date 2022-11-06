async function attachEvents() {
    console.log('TODO...');

    // getting the posts data from the server
    let initalResponse = await fetch('http://localhost:3030/jsonstore/blog/posts');
    let postsData = await (initalResponse.json());

    console.log(initalResponse)
    console.log(postsData)

    // attaching event listener to the Load button
    let loadPostsButton = document.getElementById('btnLoadPosts');
    loadPostsButton.addEventListener('click', loadPosts);

    // getting the HTML elements needed for later
    let options = document.getElementById('posts');
    let postTitle = document.getElementById('post-title');
    let postContent = document.getElementById('post-body');
    let ULComments = document.getElementById('post-comments');


    let commentsHTML = `

    `;

    let optionsHTML = `

    `;

    // putting the options in the dropdown menu
    function loadPosts(event) {
        optionsHTML = '';

        for (let post of Object.entries(postsData)) {
            optionsHTML += `
            <option value=${post[0]}>${post[1].title}</option>
            `
        }

        options.innerHTML = optionsHTML;

    }

    // attaching event listener to the View button
    let viewCommentsButton = document.getElementById('btnViewPost');
    viewCommentsButton.addEventListener('click', viewComments);

    // Viewing the selected article
    async function viewComments(event) {
        console.log(options.value);
        console.log(postsData[options.value]);

        // putting the title and text content in the HTML according to what is selected
        let currentArticle = postsData[options.value];
        postTitle.textContent = currentArticle.title
        postContent.textContent = currentArticle.body

        // getting the needed info for the comments from the server.
        let commentsRespose = await fetch(`http://localhost:3030/jsonstore/blog/comments`)
        let commentsData = await (commentsRespose.json());
        commentsHTML = ``;

        // filtering the comments correspong to the postId and 
        for (let comment of Object.entries(commentsData)) {

            if (comment[1].postId === options.value) {
                commentsHTML += `
                <li id="${comment[0]}">${comment[1].text}</li>
                `;
            }

        }

        ULComments.innerHTML = commentsHTML;

    }

}

attachEvents();

