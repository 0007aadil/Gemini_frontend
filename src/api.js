



import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const sendChat = (question) => API.post('/chat', { question });
export const suggestInvestments = (query) => API.post('/chat/suggest-investments', { query });
