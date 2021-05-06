import { genericGetNoParameters, genericGetWithParameters,genericDeleteWithParameters,genericCallWithBody, genericDeleteNoParameters } from "./Networking";

export const getLevelByID = async (levelID) => {
    try {
        const params = {
            'id': levelID
        };
        const response = await genericGetWithParameters('Levels', params);
        return response;
    } catch (error) {
        console.error(error);
    }
}
export const getLevels = async () => {
    try {
        const response = await genericGetNoParameters('Levels');
        return response;
    } catch (error) {
        console.error(error);
    }
}

export const deleteLevelByID = async (levelID) => {
    try {
        const response = await genericDeleteNoParameters('Levels', levelID);
        return response;
    } catch (error) {
        console.error(error);
    }
}
export async function saveLevel(model) {
    var method = 'POST';
    var apiName = 'Levels/';
    let response = await genericCallWithBody(method, apiName, model);
    return response;
}
export async function updateLevel(id, model) {
    var method = 'PUT';
    var apiName = 'Levels/' + id;
    let response = await genericCallWithBody(method, apiName, model);
    return response;
}