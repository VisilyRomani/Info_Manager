import axios from 'axios';


function login(username, password) {
    return axios.post('/auth/login', {username, password},{ withCredentials: true });
}

// const register = () => {
//     return axios.post(API_URL + '/register', {
//         username:'sprouts-admin',
//         password:'sprouts8970',
//     });
// }

function checkLogin(){
    return axios.get("/auth/jwt",{ withCredentials: true })
    .then((response) => {
        return response.data});
}

const authService = {
    login, checkLogin
}
export default authService;