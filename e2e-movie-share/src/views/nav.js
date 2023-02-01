
import { html } from '../lib/lit-html.js';


export const navTemplate = (hasUser) => html `

    <div class="navbar-container">
        <a href="/" class="first-nav"> <i class="fa-solid fa-ticket"></i>  Home</a>
        <div class="navbar-menu">
            
            <a href="/catalog" class="nav-item">All Movies</a>
            ${hasUser ? html `
            <a href="/profile" class="nav-item">Profile</a>
            <a href="/create" class="nav-item">Create</a>
            <a href="/logout" class="nav-item">Logout</a>
            ` : html `
            <a href="/register" class="nav-item">Sign Up</a>
            <a href="/login" class="nav-item">Sign In</a>
            `}
        </div>
    </div>

`;

