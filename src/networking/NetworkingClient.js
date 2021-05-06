import { genericGetNoParameters, genericGetWithParameters,genericDeleteWithParameters,genericCallWithBody, genericDeleteNoParameters } from "./Networking";

export const getClientByID = async (clientID) => {
    try {
        const params = {
            'id': clientID
        };
        const response = await genericGetWithParameters('Clients', params);
        return response;
    } catch (error) {
        console.error(error);
    }
}
export const getClients = async () => {
    try {
        const response = await genericGetNoParameters('Clients');
        return response;
    } catch (error) {
        console.error(error);
    }
}

export const deleteClientByID = async (clientID) => {
    try {
        const response = await genericDeleteNoParameters('Clients', clientID);
        return response;
    } catch (error) {
        console.error(error);
    }
}
export async function saveClient(model) {
    var method = 'POST';
    var apiName = 'Clients/';
    let response = await genericCallWithBody(method, apiName, model);
    return response;
}
export async function updateClient(id, model) {
    var method = 'PUT';
    var apiName = 'Clients/' + id;
    let response = await genericCallWithBody(method, apiName, model);
    return response;
}