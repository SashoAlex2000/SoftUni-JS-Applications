import { get } from "./api.js";

const endpoints = {

    'catalog': '/data/catalog',
    'byId': '/data/catalog/',

}

export async function getAll () {

    return get(endpoints.catalog);

}

export async function getByID (id) {

    return get(endpoints.byId + id);

}

