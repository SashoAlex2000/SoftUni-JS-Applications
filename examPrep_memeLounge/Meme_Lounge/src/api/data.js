import { del, get, post, put } from "./api.js";


export async function getAllItems () {

    const data = await get('/data/memes?sortBy=_createdOn%20desc')
    return data;

}

export async function getItemById (id) {

    const data = await get(`/data/memes/${id}`)
    return data;

}

export async function createItem (itemData) {

    const data = await post('/data/memes', itemData)
    return data;

}

export async function deleteItem(deleteId) {

    await del(`/data/memes/${deleteId}`);

}

export async function updateItem(id, data) {

    await put(`/data/memes/${id}`, data)

}

// 

export async function getMemesByUser (userId) {

    const data = await get(`/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
    return data;

}