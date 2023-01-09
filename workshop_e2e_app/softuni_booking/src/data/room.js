import { addOwner } from "../util.js";
import { del, get, post, put } from "./api.js";


const endpoints = {
    'rooms': '/classes/Room',
    'roomById': '/classes/Room/',
}


export async function getAll() {
    return get(endpoints.rooms);
}

export async function getByID(id) {
    return get(endpoints.roomById + id);
}

export async function create(roomData, userId) {

    // const data = Object.assign({}, roomData);
    // data.owner = { __type: 'Pointer', className: '_User', objectId: userId };

    return post(endpoints.rooms, addOwner(roomData, userId));

}

export async function update(id, roomData, userId) {
    return put(endpoints.roomById + id, addOwner(roomData, userId));
}

export async function deleteByID(id) {
    return del(endpoints.roomById + id);
}
