
export function setUserData(data) {

    sessionStorage.setItem('userId', data._id);
    sessionStorage.setItem('username', data.username);
    sessionStorage.setItem('accessToken', data.accessToken);

}

export function clearUserData() {

    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('accessToken');

}

export function createSubmitHandler(formID, callback) {

    document.getElementById(formID).addEventListener('submit', onSubmit);

    function onSubmit(event) {

        event.preventDefault();

        console.log(event.target)
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        callback(data, event);

    }

}

