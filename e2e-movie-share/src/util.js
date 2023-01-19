
export function setUserData (data) {
    sessionStorage.setItem('userData', JSON.stringify(data));
}

export function getUserData () {

    const data = JSON.parse(sessionStorage.getItem('userData'));
    return data;

}

export function removeUserData () {
    sessionStorage.removeItem('userData');
}


export function createSubmiteHandler(callback) {

    return function (event) {

        event.preventDefault();
        const eventData = new FormData(event.target);
        const data = Object.fromEntries([...eventData].map(([k, v])=>[k, v.trim()]));

        callback(data, event.target);

    }

}


export function createPointer (className, objectId) {
    return {
        __type: 'Pointer',
        className,
        objectId,
    }
}


export function addOwnerPointerToObject (object, ownerId) {

    const data = Object.assign({}, object);
    data.owner = createPointer('_User', ownerId);
    return data;

}


export const movieOptions = {
    'G': 'General Audiences [G]',
    'PG': 'Parental Guidance [PG]',
    'PG-13': 'Strong Parental Guidance [PG-13]',
    'R': 'Restricted [R]',
    'NC-17': 'No One 17 and Under [NC-17]',
}