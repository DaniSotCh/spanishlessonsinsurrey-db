import { genericGetNoParameters, genericGetWithParameters,genericDeleteWithParameters,genericCallWithBody, genericDeleteNoParameters } from "./Networking";

export const getServiceByID = async (serviceID) => {
    try {
        const params = {
            'id': serviceID
        };
        const response = await genericGetWithParameters('Services', params);
        return response;
    } catch (error) {
        console.error(error);
    }
}
export const getServices = async () => {
    try {
        const response = await genericGetNoParameters('Services');
        return response;
    } catch (error) {
        console.error(error);
    }
}

export const deleteServiceByID = async (serviceID) => {
    try {
        const response = await genericDeleteNoParameters('Services', serviceID);
        return response;
    } catch (error) {
        console.error(error);
    }
}
export async function saveService(model) {
    var method = 'POST';
    var apiName = 'Services/';
    let response = await genericCallWithBody(method, apiName, model);
    return response;
}
export async function updateService(id, model) {
    var method = 'PUT';
    var apiName = 'Services/' + id;
    let response = await genericCallWithBody(method, apiName, model);
    return response;
}