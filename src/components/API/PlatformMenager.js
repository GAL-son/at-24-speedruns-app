import axios from 'axios'

const localServerAdress = "http://localhost:8080";
const PlatformRelatedEndpointsBase = "/speedruns/api/platforms";
//const deleteGameEndPoint="/speedruns/api"

const PlatformBaseURL = localServerAdress + PlatformRelatedEndpointsBase;
//const deleteGamesURL=localServerAdress+deleteGameEndPoint;

export const getPlatforms = () => {
    return axios.get(`${PlatformBaseURL}`)
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            console.log(err)
        })
}

export const addPlatform = (name, type, token) => {
    const header = {headers: {Authorization: `Bearer ${token}`}}
    const data = {
        name: name,
        type: type
    };
    return axios.post(
        `${PlatformBaseURL}`,
        data,
        header)
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
}

export const updatePlatform = (platformId,name, type, token) => {
    const header = {headers: {Authorization: `Bearer ${token}`}}
    const data = {
        name: name,
        type: type
    };
    return axios.put(
        `${PlatformBaseURL}/${platformId}`,
        data,
        header)
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
}

export const deletePlatform = (platformId,name, type, token) => {
    const header = {headers: {Authorization: `Bearer ${token}`}}

    return axios.delete(
        `${PlatformBaseURL}/${platformId}`, header)
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
}