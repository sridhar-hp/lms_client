import axios from "axios";

const API = "http://localhost:5000/api";

export const pdetails = (token: any) => {
    return axios.get(`${API}/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const Pbioupdate = (profile: any, token: any) => {
    return axios.put(`${API}/profile`, profile, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const uploadProfileImage = (file: File, token: any) => {
    const formData = new FormData();
    formData.append("profileImage", file);

    return axios.post(`${API}/profile/image`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },
    });
};