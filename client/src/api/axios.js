import axios from 'axios';
//const BASE_URL='http://172.29.50.69:3500'
//const BASE_URL='https://careersync.onrender.com'

const BASE_URL='http://raman20223177.ap-1.evennode.com/'
//Sanskar1751978@
//const BASE_URL='http://127.0.0.1:3500/'
//const BASE_URL='http://localhost:3500'
//axios.defaults.withCredentials = true;
export default axios.create({
    baseURL: BASE_URL,
  //  withCredentials: true
});
export const axiosPrivate= axios.create({
    baseURL: BASE_URL,
    headers:{'Content-Type':'application/json'},
    withCredentials: true
});