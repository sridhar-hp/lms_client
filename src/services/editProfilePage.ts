import axios from "axios";

const API = "http://localhost:5000/api";

export const pdetails = (userId: any, token: any) => {
    return axios.get(`${API}/profile/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const Pbioupdate = (userId: any, token: any, profile: any) => {
    return axios.put(`${API}/profileupdate/${userId}`, profile, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};