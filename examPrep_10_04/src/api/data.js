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

export async function getUserListings(userId) {

    const data = await get(`/data/posts?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
    return data;

}

