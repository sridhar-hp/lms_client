import axios from "axios";

const API = "http://localhost:5000/api";

// 🔐 LOGIN
export const loginUser = (data) => {
  return axios.post(`${API}/login`, data);
};

// 📝 REGISTER
export const registerUser = (data) => {
  return axios.post(`${API}/register`, data);
};