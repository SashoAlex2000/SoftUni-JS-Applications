import { get, post } from "./api.js";


export async function getTotalDonations (postId) {

    const data = await get(`/data/donations?where=postId%3D%22${postId}%22&distinct=_ownerId&count`)
    return data

}

export async function getDOnationsForUser (postId, userId) {

    const data = await get(`/data/donations?where=postId%3D%22${postId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
    return data;

}


export async function sendDonation (postId) {

    const data = await post(`/data/donations`, {postId});

}
