import axios from 'axios';

const API = 'http://localhost:5000';

export const addStory = (data) => {
  console.log(data);
  return axios.post(`${API}/story/add`, data);
};

export const getAllStories = () => axios.get(`${API}/story/get`);
