import axios from "axios";

const API = "http://localhost:5000/api";

export const requestRejection = ({ id }, token) => {
    return axios.put(`${API}/rejection/${id}`, {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const requestApproval = ({ id }, token) => {
    return axios.put(`${API}/accept/${id}`, {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const userRequests = (token) => {
    return axios.get(`${API}/request`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};


