import axios from 'axios'

const localServerAdress = "http://localhost:8080";
const userRelatedEndpointsBase = "/speedruns/api/users";
const userBaseURL=localServerAdress+userRelatedEndpointsBase;

export const getUsers = () => {
    return axios.get(`${userBaseURL}`)
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            console.log(err)
        })
}

export const register = (login,email,password,role) => {
    const data={
        login:login,
        email:email,
        password:password,
        role:role
    }
    return axios.post(`${userBaseURL}`)
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            console.log(err)
        })
}

export const login = (login,password) => {
    const data={
        login:login,
        password:password
    }
    return axios.post(`${userBaseURL}`)
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            console.log(err)
        })
}
export const updateUser = (userId,login,email,password,role,token) => {
    const header = {headers: {Authorization: `Bearer ${token}`}}
    const data={
        login:login,
        email:email,
        password:password,
        role:role
    }
    return axios.put(`${userBaseURL}/${userId}`,data,header)
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
}
export const deleteUser = (userId,token) => {
    const header = {headers: {Authorization: `Bearer ${token}`}}

    return axios.delete(`${userBaseURL}/${userId}`,header)
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
}







