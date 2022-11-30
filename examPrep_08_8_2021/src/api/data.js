import { del, get, post, put } from "./api.js";


export async function getAllItems () {

    const data = await get('/data/books?sortBy=_createdOn%20desc')
    return data;

}

export async function getItemById (id) {

    const data = await get(`/data/books/${id}`)
    return data;

}

export async function createItem (itemData) {

    const data = await post('/data/books', itemData)
    return data;

}

export async function deleteItem(deleteId) {

    await del(`/data/books/${deleteId}`);

}

export async function updateItem(id, data) {

    await put(`/data/books/${id}`, data)

}

export async function getBooksByUser (userId) {

    const data = await get(`/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
    return data;

}

