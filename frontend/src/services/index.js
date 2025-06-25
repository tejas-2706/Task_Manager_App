import axios from 'axios'
import { Backend_Url } from '../config';



export const callSignupUserApi = async(formData) => {
    const response = await axios.post(`${Backend_Url}/user/signup`, formData, {withCredentials:true});    
    return response?.data
}

export const callloginUserApi = async(formData) => {
    const response = await axios.post(`${Backend_Url}/user/login`, formData, {withCredentials:true});
    return response?.data
}

export const callUserAuthApi = async() => {
    const response = await axios.post(`${Backend_Url}/user/auth`, {}, {withCredentials:true});
    return response?.data
}


export const callLogoutUserApi = async() => {
    const response = await axios.post(`${Backend_Url}/user/logout`, {} , {withCredentials:true});
    return response?.data
}

export const addNewTaskApi = async (formData) => {
    const response = await axios.post(`${Backend_Url}/task/add`,
        formData
    );
    return response?.data
}

export const getAllTasksApi = async (getCurrnUserId) => {
    const resposne = await axios.get(`${Backend_Url}/task/get-all-tasks/${getCurrnUserId}`);
    return resposne?.data
}

export const deleteTaskAPi =async (getTaskId) => {
    const response = await axios.delete(`${Backend_Url}/task/delete/${getTaskId}`);
    return response?.data
}

export const updateTaskApi = async (formData) => {
    const response = await axios.put(`${Backend_Url}/task/update`,
        formData
    );
    return response?.data
}