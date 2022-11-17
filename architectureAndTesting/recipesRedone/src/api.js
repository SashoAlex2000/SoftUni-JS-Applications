const host = 'http://localhost:3030'

async function request(method, url, data) {

    const options = {
        method: `${method}`,
        headers: {

        }
    }

    if (data !== undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const token = sessionStorage.getItem('accessToken');
    if (token) {

        options.headers['X-Authorization'] = token;

    }


    try {
        const response = await fetch(host + url, options);

        console.log(response);

        if (response.ok !== true) {
            const error = await response.json();
            console.log(error);
            throw new Error(error.message);
        }

        // to prevent the 'unexpected end of JSON input' error when the server returns a 204 'No Content'
        if (response.status === 204) {

            return response;

        }

        const userDataCurr = await response.json();
        // console.log('the logout data is: ')
        console.log(userDataCurr);
        // console.log('bazinga')

        return userDataCurr
    } catch(error) {
        alert(error.message);
        throw error;
    }

}

export const get = request.bind(null, 'get');
export const post = request.bind(null, 'post');
export const put = request.bind(null, 'put');
export const del = request.bind(null, 'delete');

