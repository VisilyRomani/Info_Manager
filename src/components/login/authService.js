import axios from 'axios';


async function checkLogin() {
    const response = await axios.get('/auth/jwt', { withCredentials: true });
    return response.data;
}


function login(username, password) {
    return axios.post('/auth/login', {username, password},{ withCredentials: true });
}

// const register = () => {
//     return axios.post(API_URL + '/register', {
//         username:'sprouts-admin',
//         password:'sprouts8970',
//     });
// }



const authService = {
    login, checkLogin
}
export default authService;