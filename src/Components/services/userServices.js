import axios from "axios";

const registerUser = (email, phone, username, password) => {
    return axios.post('http://localhost:8888/api/v1/register', {
        email, phone, username, password
    })
}
const loginUser = (valueLogin, password) => {
    return axios.post('http://localhost:8888/api/v1/login', {
        valueLogin, password
    })
}
const fetchUserData = (page, limit) => {
    return axios.get(`http://localhost:8888/api/v1/user/read?page=${page}&limit=${limit}`)
}
const deleteUser = (user) => {
    return axios.delete('http://localhost:8888/api/v1/user/delete', { data: { id: user.id } });
}
export { registerUser, loginUser, fetchUserData, deleteUser };