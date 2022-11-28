import { del, get, post, put } from "./api.js";


export async function getAllShoes () {

    const data = await get('/data/shoes?sortBy=_createdOn%20desc')
    return data;

}

export async function getShoeById (id) {

    const data = await get(`/data/shoes/${id}`)
    return data;

}

export async function createShoe (shoeData) {

    const data = await post('/data/shoes', shoeData)
    return data;

}

export async function deleteShoe(shoeId) {

    await del(`/data/shoes/${shoeId}`);

}

export async function updateShoe(shoeId, data) {

    await put(`/data/shoes/${shoeId}`, data)

}