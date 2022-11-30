import { del, get, post, put } from "./api.js";


export async function getAllGames () {

    const data = await get('/data/games?sortBy=_createdOn%20desc')
    return data;

}

export async function getLastThreeGames () {

    const data = await get('/data/games?sortBy=_createdOn%20desc&distinct=category')
    return data;

}

export async function getGameById (id) {

    const data = await get(`/data/games/${id}`)
    return data;

}

export async function createGame (gameData) {

    const data = await post('/data/games', gameData)
    return data;

}

export async function deleteGame(deleteId) {

    await del(`/data/games/${deleteId}`);

}

export async function updateGame(gameId, data) {

    await put(`/data/games/${gameId}`, data)

}