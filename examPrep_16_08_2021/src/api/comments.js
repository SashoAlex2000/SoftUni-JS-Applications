import { del, get, post, put } from "./api.js";


export async function getAllComments (gameId) {

    const data = await get(`/data/comments?where=gameId%3D%22${gameId}%22`)
    return data;

}

export async function postComment (gameId, comment) {

  await post(`/data/comments`, {gameId, comment})


}