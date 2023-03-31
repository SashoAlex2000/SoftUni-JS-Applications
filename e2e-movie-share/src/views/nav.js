
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

export const secondNavTemplate = (hasUser) => html `

        <div class="navbar-container-2">
            <a href="/" id="navbar-logo"> <i class="fa-solid fa-ticket"></i>  Home</a>
            <div class="navbar-toggle" id="mobile-menu">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </div>
            <ul class="navbar-menu-2">
                <li class="navbar-item">
                    <a href="/" class="navbar-links">
                        H0me
                    </a>
                </li>
                <li class="navbar-item">
                    <a href="/test_flex.html" class="navbar-links">
                        Tech
                    </a>
                </li>
                <li class="navbar-item">
                    <a href="./test_page.html" class="navbar-links">
                        Products
                    </a>
                </li>
                <li class="navbar-btn">
                    <a href="/" class="button">
                        Sign Up
                    </a>
                </li>
            </ul>
        </div>

`
