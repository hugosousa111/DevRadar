import axios from 'axios';

const api = axios.create({
  //a do expo com a porta do node
  // se for android emulator 10.0.2.2
  baseURL: 'http://10.0.0.104:3333',
});

export default api;