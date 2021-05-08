import { genericGetNoParameters, genericGetWithParameters,genericCallWithBody, genericDeleteNoParameters } from "./Networking";

export const getCompanyByID = async (companyID) => {
    try {
        const params = {
            'id': companyID
        };
        const response = await genericGetWithParameters('Companys', params);
        return response;
    } catch (error) {
        console.error(error);
    }
}
export const getCompanys = async () => {
    try {
        const response = await genericGetNoParameters('Companys');
        return response;
    } catch (error) {
        console.error(error);
    }
}

export const deleteCompanyByID = async (companyID) => {
    try {
        const response = await genericDeleteNoParameters('Companys', companyID);
        return response;
    } catch (error) {
        console.error(error);
    }
}
export async function saveCompany(model) {
    var method = 'POST';
    var apiName = 'Companys/';
    let response = await genericCallWithBody(method, apiName, model);
    return response;
}
export async function updateCompany(id, model) {
    var method = 'PUT';
    var apiName = 'Companys/' + id;
    let response = await genericCallWithBody(method, apiName, model);
    return response;
}