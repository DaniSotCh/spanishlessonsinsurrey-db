import { genericGetNoParameters, genericGetWithParameters,genericCallWithBody, genericDeleteNoParameters } from "./Networking";

export const getCompanyByID = async (companyID) => {
    try {
        const params = {
            'id': companyID
        };
        const response = await genericGetWithParameters('Companies', params);
        return response;
    } catch (error) {
        console.error(error);
    }
}
export const getCompanies = async () => {
    try {
        const response = await genericGetNoParameters('Companies');
        return response;
    } catch (error) {
        console.error(error);
    }
}

export const deleteCompanyByID = async (companyID) => {
    try {
        const response = await genericDeleteNoParameters('Companies', companyID);
        return response;
    } catch (error) {
        console.error(error);
    }
}
export async function saveCompany(model) {
    var method = 'POST';
    var apiName = 'Companies/';
    let response = await genericCallWithBody(method, apiName, model);
    return response;
}
export async function updateCompany(id, model) {
    var method = 'PUT';
    var apiName = 'Companies/' + id;
    let response = await genericCallWithBody(method, apiName, model);
    return response;
}