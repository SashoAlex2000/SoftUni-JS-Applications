
import { addOwnerPointerToObject, encodeObject } from '../util.js';
import { get, post } from './api.js'

const endpoints = {
    'movies': '/classes/Movie', 
    'movieById': '/classes/Movie/', 
    // this is for the test server from Viktor :D
    // 'moviesBySearchWord': (name)=>`/classes/Movie?where=name%20LIKE%20%22${encodeURIComponent(name)}%22`,
    // taken from the API docs, but only works with a full match.
    'moviesBySearchWord': (searchName)=>`/classes/Movie?where=${encodeObject({
        "name": {"$in": [searchName,]},
    })}`,
    // using a regex it works
    // TODO work on capitalized words
    'moviesBySearchWordRegex': (searchName)=>`/classes/Movie?where=${encodeObject({
        "name": {"$regex": searchName},
    })}`,
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

export async function getMovieBySearchWord (searchWord) {
    
    // works with the regex
    const data = await get(endpoints.moviesBySearchWordRegex(searchWord));
    return data;

}
