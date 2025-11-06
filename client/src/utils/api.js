// client/src/utils/api.js
import axios from 'axios';

// With CRA, this lets you override in production if needed
const baseURL = process.env.REACT_APP_API_BASE || '/api';

const api = axios.create({
  baseURL,
  withCredentials: true, // if you ever use cookies
});

export default api;
