import { del, get, post, put } from "./api.js";


export async function getAllItems () {

    const data = await get('/data/posts?sortBy=_createdOn%20desc')
    return data;

}

export async function getItemById (id) {

    const data = await get(`/data/posts/${id}`)
    return data;

}

export async function createListing (listignData) {

    const data = await post('/data/posts', listignData)
    return data;

}

export async function deleteListing(offerId) {

    await del(`/data/posts/${offerId}`);

}

export async function updateListing(offerId, data) {

    await put(`/data/posts/${offerId}`, data)

}

