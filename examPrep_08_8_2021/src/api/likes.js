import { get, post } from "./api.js";

export async function getAllLIkes (bookId) {

    const data = await get(`/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`)
    return data;

}

export async function getCurrentUserLikes (bookId, userId) {

    const data = await get(`/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
    return data;

}

export async function likePost (bookId) {

    await post(`/data/likes`, {bookId})


}