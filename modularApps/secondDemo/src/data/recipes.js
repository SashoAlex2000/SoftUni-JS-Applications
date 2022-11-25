import { get } from "./api.js";


const pageSize = 3;

const endpoints = {

    // 'recipes': `/data/recipes?sortBy=_createdOn%20desc&pageSize=${pageSize}&offset=`,
    'recipes': `/data/recipes?sortBy=_createdOn%20desc`,
    'byId': '/data/recipes/',
    'recipeCount': '/data/recipes/',
    // 'search': (query) => `/data/recipes`

}

export async function getAll (page, query) {

    let URL =endpoints.recipes;
    let sizeURL = URL;
    URL += `&pageSize=${pageSize}&offset=${(page-1) * pageSize}`;
    if (query) {
        URL += `&where=${encodeURIComponent(`name LIKE "${query}"`)}`;
        sizeURL += `&where=${encodeURIComponent(`name LIKE "${query}"`)}`;
    }
    sizeURL += `&count`;
    // return get(endpoints.recipes + (page - 1) * pageSize);
    const [data, size] = await Promise.all([
        get(URL),
        get(sizeURL)
    ])
    return {
        data,
        pages: Math.ceil(size / pageSize)
    };

}

export async function getByID (id) {

    return get(endpoints.byId + id);

}


