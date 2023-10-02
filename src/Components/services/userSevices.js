import axios from "axios";

const registerUser = (email, phone, username, password) => {
    return axios.post('http://localhost:8888/api/v1/register', {
        email, phone, username, password
    })
}
export { registerUser };