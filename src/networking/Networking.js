import jwt from 'jsonwebtoken';
var apiURL = 'https://localhost:44325/api/';

export async function genericGetWithParameters(apiName, params){
    try {
        let query = Object.keys(params)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
            .join('&');  
        let response = await fetch(apiURL + apiName + '/' + query, {
            method: 'GET',
            headers: {
            },
        });
        /* let responseJWT = await response.json();
        //console.log(responseJWT.data);
        var decoded = jwt.decode(responseJWT.data);
        console.group(apiName)
        console.log(decoded);
        console.groupEnd();
        let responseJSON = decoded.response;
        responseJSON.httpStatusCode = response.status; */
        return response.json();
    } catch (error) {
        console.error(error);
    }
}
export async function genericGetNoParameters(apiName) {
    try {
        let response = await fetch(apiURL + apiName, {
            method: 'GET',
            headers: {},
        });
        /* let responseJWT = await response.json();
        //console.log(responseJWT.data);
        var decoded = jwt.decode(responseJWT.data);
        console.group(apiName)
        console.log(decoded);
        console.groupEnd();
        let responseJSON = decoded.response;
        responseJSON.httpStatusCode = response.status; */
        return response.json();
    } catch (error) {
        console.error(error);
    }
}
export async function genericDeleteWithParameters(apiName, params){
    try {
        let query = Object.keys(params)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
            .join('&');  
        let response = await fetch(apiURL + apiName + '/' + query, {
            method: 'DELETE',
            headers: {},
        });
        let responseJson = await response.json();
        responseJson.httpStatusCode = response.status;
        return responseJson;
    } catch (error) {
        console.error(error);
    }
}
export async function genericDeleteNoParameters(apiName, params){
    try {
        let response = await fetch(apiURL + apiName + '/' + params, {
            method: 'DELETE',
            headers: {},
        });
        let responseJson = await response.json();
        responseJson.httpStatusCode = response.status;
        return responseJson;
    } catch (error) {
        console.error(error);
    }
}

export async function genericCallWithBody(method, apiName, model) {
    try {
        let response = await fetch(apiURL + apiName, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(model),
        });
        let responseJson = await response.json();
        responseJson.httpStatusCode = response.status;
        /* console.log(response);
        var httpErrorMessage = undefined;
        responseJson.httpErrorMessage = httpErrorMessage; */
        return responseJson;
    } catch (error) {
        console.error(error);
    }
}