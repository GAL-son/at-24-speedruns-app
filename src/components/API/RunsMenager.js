import axios from 'axios'

const localServerAdress = "http://localhost:8080";
const runsRelatedEndpointsBase = "/speedruns/api/runs";
//const deleteGameEndPoint="/speedruns/api"

const runsBaseURL = localServerAdress + runsRelatedEndpointsBase;
//const deleteGamesURL=localServerAdress+deleteGameEndPoint;

export const getRuns = () => {
    return axios.get(`${runsBaseURL}`)
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            console.log(err)
        })
}

export const addRun = (userId,gameId,time,videoLink,type,platformId,token) => {
    const header = {headers: {Authorization: `Bearer ${token}`}}
    const data = {
       userId:userId,
        gameId:gameId,
        time:time,
        videoLink:videoLink,
        type:type,
        platformId:platformId
    };
    return axios.post(`${runsBaseURL}`,data,header)
        .then((res) => {
            console.log(res)
            return res;
        })
        .catch((err) => {
            console.log(err)
            throw err;
        })
}

export const updateRun = (runId,userId,gameId,time,videoLink,type,platformId,token) => {
    const header = {headers: {Authorization: `Bearer ${token}`}}
    const data = {
        userId:userId,
        gameId:gameId,
        time:time,
        videoLink:videoLink,
        type:type,
        platformId:platformId
    };
    return axios.put(`${runsBaseURL}/${runId}`,data,header)
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
}

export const deleteRun = (runId,token) => {
    const header = {headers: {Authorization: `Bearer ${token}`}}
    return axios.delete(`${runsBaseURL}/${runId}`,header)
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
}