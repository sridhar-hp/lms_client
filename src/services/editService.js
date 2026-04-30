import axios from "axios";

const API = "http://localhost:5000/api";

export const fetchUserData = (token) => {
    return axios.get(`${API}/setting`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

};

export const updatePassword = ({ id, newPassword }, token) => {
    return axios.post(`${API}/admin/reset-password/${id}`,
        { password: newPassword }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const fetchUser = (token) => {
    return axios.get(`${API}/setting`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const deleteUser = ({ id }, token) => {
    return axios.delete(`${API}/dusers/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

};

export const saveUser = ({ updateid, updatedItem }, token) => {
    return axios.put(`${API}/users/${updateid}`, updatedItem, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

