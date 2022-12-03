import { del, get, post, put } from "./api.js";


export async function getAllItems () {

    const data = await get('/data/albums?sortBy=_createdOn%20desc')
    return data;

}

export async function getItemById (id) {

    const data = await get(`/data/albums/${id}`)
    return data;

}

export async function createItem (itemData) {

    const data = await post('/data/albums', itemData)
    return data;

}

export async function deleteItem(deleteId) {

    await del(`/data/albums/${deleteId}`);

}

export async function updateItem(id, data) {

    await put(`/data/albums/${id}`, data)

}
