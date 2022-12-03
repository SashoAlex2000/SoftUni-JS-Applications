// /data/likes?where=albumId%3D%22{albumId}%22&distinct=_ownerId&count

import { get, post } from "./api.js";

export async function getAllLikes (albumId) {

    const data = await get(`/data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`)
    return data;

}

// 

export async function hasCUrrentUserLiked (albumId, userId) {

    const data = await get(`/data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
    return data;

}

// /data/likes

export async function likeAlbum (albumId) {

    await post(`/data/likes`, {
        albumId
    })

}