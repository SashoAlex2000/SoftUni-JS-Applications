import { del, get, post, put } from "./api.js";


export async function getAllOffers () {

    const data = await get('/data/offers?sortBy=_createdOn%20desc')
    return data;

}

export async function getOfferById (id) {

    const data = await get(`/data/offers/${id}`)
    return data;

}

export async function createOffer (offerData) {

    const data = await post('/data/offers', offerData)
    return data;

}

export async function deleteOffer(offerId) {

    await del(`/data/offers/${offerId}`);

}

export async function updateOffer(offerId, data) {

    await put(`/data/offers/${offerId}`, data)

}