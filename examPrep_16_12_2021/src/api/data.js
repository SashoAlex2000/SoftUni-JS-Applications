import { del, get, post, put } from "./api.js";


export async function getAllItems () {

    const data = await get('/data/theaters?sortBy=_createdOn%20desc')
    return data;

}

export async function getItemById (id) {

    const data = await get(`/data/theaters/${id}`)
    return data;

}

export async function createItem (itemData) {

    const data = await post('/data/theaters', itemData)
    return data;

}

export async function deleteItem(deleteId) {

    await del(`/data/theaters/${deleteId}`);

}

export async function updateItem(id, data) {

    await put(`/data/theaters/${id}`, data)

}

export async function getUserItems (userId) {

    const data = await get(`/data/theaters?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
    return data;

}
