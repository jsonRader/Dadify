const DAD_URL = "https://icanhazdadjoke.com/api";

export default {
    makeRequest: async function(path, method, data) {
        const defaultHeaders = {
            'Content-Type': 'application/json'
        }
        const options = {
            method,
            headers: defaultHeaders
        }
        if (data) {
            options.body = JSON.stringify(data);
        }
        console.log(BASE_URL + path);
        console.log(options);
        const response = await fetch(BASE_URL + path, options);
        const responseData = await response.json();
        console.log(responseData);
        return responseData;
    }
}