import { clearUserData, setUserData } from '../util.js';
import { get, post } from './api.js';


export async function login (email, password) {

    const { _id, username: resultUsername, email: resultEmail,  gender, accessToken} = await post('/users/login', {email, password});

    setUserData({
        _id,
        username: resultUsername,
        email: resultEmail,
        gender,
        accessToken
    })

}

export async function register (username, email, password, gender) {

    const {  _id, username: resultUsername, email: resultEmail,  gender: resultGender, accessToken} = await post('/users/register', {username, email, password, gender});

    setUserData({
        _id,
        username: resultUsername,
        email: resultEmail,
        accessToken,
        gender: resultGender
    })

}


export async function logout () {

    get('/users/logout') 
    clearUserData();

}

window.login = login;