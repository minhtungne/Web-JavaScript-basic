import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Lấy danh sách người dùng
export const getAllUsers = () => {
  return axios.get(`${API_URL}/users`);
};

// Thêm người dùng mới
export const signupUser  = (userData) => {
  return axios.post(`${API_URL}/users`, userData);
};

// Lấy danh sách người dùng theo ID
export const getUserById = (id) => {
  return axios.get(`${API_URL}/users/${id}`);
};

// Lấy danh sách người dùng theo Email
export const getUserByEmail = (email) => {
  return axios.get(`${API_URL}/users/email/${email}`);
};

// Cập nhật thông tin người dùng
export const updateUser  = (id, userData) => {
  return axios.put(`${API_URL}/users/${id}`, userData);
};

// Xóa người dùng
export const deleteUser  = (id) => {
  return axios.delete(`${API_URL}/users/${id}`);
};


