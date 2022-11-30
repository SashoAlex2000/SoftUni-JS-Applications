
import { getBooksByUser } from '../api/data.js';
import { html } from '../lib.js';

const profileTemplate = (currentBooks) => html `
<section id="my-books-page" class="my-books">
<h1>My Books</h1>

    ${!!currentBooks&&currentBooks.length > 0 ? html `
    <ul class="my-books-list">
        ${currentBooks.map(b => createBookCard(b))}
    </ul>` : html `
    <p class="no-books">No books in database!</p>
    `}
</section>
`;

const createBookCard = (book) => html `
<li class="otherBooks">
    <h3>${book.title}</h3>
    <p>Type: ${book.type}</p>
    <p class="img"><img src="${book.imageUrl}"></p>
    <a class="button" href="/dashboard/${book._id}">Details</a>
</li>
`

export async function showProfile (ctx) {

    const userId = ctx.user._id;
    console.log(userId);

    const currentBooks = await getBooksByUser(userId);

    ctx.render(profileTemplate(currentBooks));

}
