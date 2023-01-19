
import { addOwnerPointerToObject } from '../util.js';
import { get, post } from './api.js'

const endpoints = {
    'movies': '/classes/Movie', 
}


export async function create (movieData, userId) {
    await post(endpoints.movies, addOwnerPointerToObject(movieData, userId));
}

export async function getAllMovies () {
    
    const data = await get(endpoints.movies);
    return data;

}
