import axios from 'axios';

const API_URL = 'http://localhost:5000/auth';

function login(username, password) {
    return axios.post(API_URL + '/login', {username, password},{ withCredentials: true });
}

// const register = () => {
//     return axios.post(API_URL + '/register', {
//         username:'sprouts-admin',
//         password:'sprouts8970',
//     });
// }

function checkLogin(){
    return axios.get(API_URL + "/jwt",{ withCredentials: true })
    .then((response) => {
        return response.data});
}

const authService = {
    login, checkLogin
}
export default authService;