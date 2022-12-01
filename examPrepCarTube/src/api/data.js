import { del, get, post, put } from "./api.js";


export async function getAllItems () {

    const data = await get('/data/cars?sortBy=_createdOn%20desc')
    return data;

}

export async function getItemById (id) {

    const data = await get(`/data/cars/${id}`)
    return data;

}

export async function createItem (itemData) {

    const data = await post('/data/cars', itemData)
    return data;

}

export async function deleteItem(deleteId) {

    await del(`/data/cars/${deleteId}`);

}

export async function updateItem(id, data) {

    await put(`/data/cars/${id}`, data)

}


export async function getItemsForSpecificUser(userId) {

    const data = await get(`/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
    return data;

}
