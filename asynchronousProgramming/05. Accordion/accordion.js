
window.onload = solution()

async function solution() {

    let main = document.getElementById('main');

    let articlesURL = `http://localhost:3030/jsonstore/advanced/articles/list`;

    const articlesResponse = await fetch(articlesURL);
    const articles = await (articlesResponse.json());

    for (let article of articles) {
        
        let newDIV = document.createElement('div');
        newDIV.classList.add('accordion');

        let articleID = article._id

        let currentRespose = await fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${articleID}`);
        let articleData = await(currentRespose.json());


        let newDivHTML = `
        <div class="head">
                <span>${article.title}</span>
                <button class="button" id="ee9823ab-c3e8-4a14-b998-8c22ec246bd3">More</button>
            </div>
            <div class="extra">
                <p>${articleData.content}</p>
            </div>
        `;

        newDIV.innerHTML = newDivHTML;
        main.appendChild(newDIV)

    }

    let buttons = document.getElementsByTagName('button');

    for (let button of buttons) {
        button.addEventListener('click', clickFunc);
    }

    function clickFunc(event) {
        let content = event.target.parentElement.parentElement.getElementsByClassName('extra')[0]
        if (event.target.textContent === 'More') {
            content.style.display = 'block';
            event.target.textContent = 'Less'
        } else if (event.target.textContent === 'Less') {
            content.style.display = 'none';
            event.target.textContent = 'More'
        }

    }


}