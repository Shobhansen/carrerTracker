// src/utils/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',  // backend API URL
  withCredentials: true, // allows cookies / JWT tokens
});

export default api;
