import axios from 'axios'

const localServerAdress = "http://localhost:8080";
const followsRelatedEndpointsBase = " /speedruns/api/follows";
const followsBaseURL=localServerAdress+followsRelatedEndpointsBase;

export const getFollows = (token) => {
    const header = {headers: {Authorization: `Bearer ${token}`}}
    return axios.get(`${followsBaseURL}`,header,)
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            console.log(err)
        })
}


export const getFollowsForUser = (followerId,token) => {
    const header = {headers: {Authorization: `Bearer ${token}`}}
    return axios.get(`${followsBaseURL}/${followerId}`,header,)
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            console.log(err)
        })
}

export const followUser = (followerId,followingId,token) => {
    const header = {headers: {Authorization: `Bearer ${token}`}}
    const data={
        followerId:followerId,
        followingId:followingId
    }
    return axios.post(`${followsBaseURL}`,data,header)
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
}
export const deleteFollow = (followerId,followingId,token) => {
    const header = {headers: {Authorization: `Bearer ${token}`}}
    return axios.delete(`${followsBaseURL}/${followerId}/following/${followingId}`,header)
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
}