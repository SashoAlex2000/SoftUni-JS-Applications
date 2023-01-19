
import { html } from '../lib/lit-html.js';


export const navTemplate = (hasUser) => html `
<nav>
<a href="/" class="first-nav">Go to home</a>
<a href="/catalog">See All movies</a>
${hasUser ? html `
<a href="/profile">View your profile</a>
<a href="/create">Create</a>
<a href="/logout">Logout</a>
` : html `
<a href="/register">Sign Up</a>
<a href="/login">Sign In</a>
`}
</nav> 
`;

