import  axios from 'axios'
const localServerAdress="http://localhost:8080";
const gamesRelatedEndpointsBase="/speedruns/api/games";
const gamesBaseURL=localServerAdress+gamesRelatedEndpointsBase;
export const getGames=()=>{
    return axios.get(`${gamesBaseURL}`)
        .then((res)=>{return res.data})
        .catch((err)=>{console.log(err) })
}

export const getGame=(gameId)=>{
    return axios.get(`${gamesBaseURL}/${gameId}`)
        .then((res)=>{return res.data})
        .catch((err)=>{console.log(err) })
}