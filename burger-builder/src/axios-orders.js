import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-udemy-burger-e5993.firebaseio.com/',
});

export default instance;
