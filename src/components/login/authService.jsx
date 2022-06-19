import axios from "axios";

async function checkLogin() {
  const response = await axios.get("/auth/jwt", { withCredentials: true });
  return response.data;
}

function login(username, password) {
  return axios.post(
    "/auth/login",
    { username, password },
    { withCredentials: true }
  );
}

function register(username, password,firstName, lastName){
  return axios.post("/auth/register", { username, password,firstName, lastName });
};

const authService = {
  login,
  checkLogin,
  register
};
export default authService;
