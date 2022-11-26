import { get, post } from "./api.js";

const endpoints = {
    'getLikesByRecipeId': (id) => `/data/likes?where=${encodeURIComponent(`recipeId="${id}"`)}&count`,
    'getLikesByUserId': (recipeId, userId) => `/data/likes?where=${encodeURIComponent(`_ownerId="${userId}" AND recipeId="${recipeId}"`)}&count`,
    'likeRecipe': '/data/likes',
}

export async function getLikesByRecipeID (recipeId, userId) {

    const requests = [];

    requests.push(get(endpoints.getLikesByRecipeId(recipeId)));

    if (userId) {
        requests.push(get(endpoints.getLikesByUserId(recipeId, userId)))
    }

    const [likes, userLike] = await Promise.all(requests);

    return {
        likes,
        canLike: !userId || !userLike
    }

}

window.getLikesByRecipeID = getLikesByRecipeID


export async function likeRecipe (recipeId) {

    return await post(endpoints.likeRecipe, { recipeId })

}
