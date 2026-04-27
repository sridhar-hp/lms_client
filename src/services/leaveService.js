import axios from "axios";

const API = "http://localhost:5000/api";

export const balanceLeave = (data,token)=>{
    return axios.get(`${API}/leave-balance/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const applyLeave =(data, token)=>{
    return axios.post(`${API}/sapply`,data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const balanceUpdate =(data, token)=>{
    return axios.get(`${API}/leave-balance/${userId}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
};