import Apifunction from "./Apifunction.js";

export const ViewData = async (data) => {
    const getResponse = await Apifunction.ApiHelper('view', data, 'POST')
    return getResponse;
};

export const AddData = async (data) => {
    const getResponse = await Apifunction.ApiHelper('create', data, 'POST')
    return getResponse;
};

export const EditData = async (data) => {
    const getResponse = await Apifunction.ApiHelper('update', data, 'POST')
    return getResponse;
};

export const DeleteData = async (data) => {
    const getResponse = await Apifunction.ApiHelper('delete', data, 'POST')
    return getResponse;
};