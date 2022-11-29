import { get, post } from "./api.js";


export async function getAllApplications (id) {

    const data = await get(`/data/applications?where=offerId%3D%22${id}%22&distinct=_ownerId&count`)
    return data;

}

export async function getCurrentApplyStatus (userId, offerId) {

    const data = await get(`/data/applications?where=offerId%3D%22${offerId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
    return data;

}

export async function applyForJob (offerId) {

    const data = await post('/data/applications', offerId)
    return data;

}