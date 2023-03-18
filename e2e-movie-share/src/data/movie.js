
import { addOwnerPointerToObject } from '../util.js';
import { get, post } from './api.js'

const endpoints = {
    'movies': '/classes/Movie', 
    'movieById': '/classes/Movie/', 
}


export async function create (movieData, userId) {
    await post(endpoints.movies, addOwnerPointerToObject(movieData, userId));
}

export async function getAllMovies () {
    
    const data = await get(endpoints.movies);
    return data;

}

export async function getMovieById(id) {

    const data = await get(endpoints.movieById + id);
    return data;

}
