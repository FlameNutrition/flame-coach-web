import axios from 'axios';

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_SERVER}:${process.env.REACT_APP_API_PORT}/api`,
  headers: {
    Authorization: `Basic ${process.env.REACT_APP_API_AUTH}`
  }
});

export default instance;
