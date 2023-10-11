import axios from "../setup/axios"

const registerUser = (email, phone, username, password) => {
    return axios.post('api/v1/register', {
        email, phone, username, password
    })
}
const loginUser = (valueLogin, password) => {
    return axios.post('api/v1/login', {
        valueLogin, password
    })
}
const fetchUserData = (page, limit) => {
    return axios.get(`api/v1/user/read?page=${page}&limit=${limit}`)
}
const deleteUser = (user) => {
    return axios.delete('api/v1/user/delete', { data: { id: user.id } });
}
const fetchGroup = () => {
    return axios.get('api/v1/group/read');

}
const createUser = (userData) => {
    return axios.post('api/v1/user/create', { ...userData });
}
const updateUser = (userData) => {
    return axios.put('api/v1/user/update', { ...userData });
}
const getUserAccount = () => {
    return axios.get('/api/v1/account');
}
export { registerUser, loginUser, fetchUserData, deleteUser, fetchGroup, createUser, updateUser, getUserAccount };