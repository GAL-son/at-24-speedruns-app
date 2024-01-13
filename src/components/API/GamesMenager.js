import axios from 'axios'

const localServerAdress = "http://localhost:8080";
const gamesRelatedEndpointsBase = "/speedruns/api/games";
const deleteGameEndPoint="/speedruns/api";
const ratingGameEndPoint='/speedruns/api/game-ratings';

const gamesBaseURL = localServerAdress + gamesRelatedEndpointsBase;
const deleteGamesURL=localServerAdress+deleteGameEndPoint;
const ratingGameURL=localServerAdress+ratingGameEndPoint;
export const getGames = () => {
    return axios.get(`${gamesBaseURL}`)
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            console.log(err)
        })
}

export const getGame = (gameId) => {
    return axios.get(`${gamesBaseURL}/${gameId}`)
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            console.log(err)
        })
}

export const addGame = (name, releaseYear, description, image, token) => {
    const header = {headers: {Authorization: `Bearer ${token}`}}
    const data = {
        name: name,
        releaseYear: releaseYear,
        description: description,
        image: image
       // headers: {Authorization: `Bearer ${token}`}
    };
    return axios.post(
        `${gamesBaseURL}`,
        data,
        header)
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
}

export const updateGameDetails = (gameId, name, releaseYear, description, image, token) => {
    const header = {headers: {Authorization: `Bearer ${token}`}}
    const data = {
        name: name,
        releaseYear: releaseYear,
        description: description,
        image: image,
    };
    return axios.put(
        `${gamesBaseURL}/${gameId}`,
        data,
        header)
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
}

export const assignPlatformToGame = (gameId, platformId, token) => {
    const header = {headers: {Authorization: `Bearer ${token}`}}
    return axios.put(`${gamesBaseURL}/${gameId}/platform/${platformId}`,
        null,
        header)
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
}


export const deleteGame= (gameId,token) => {
    const header = {headers: {Authorization: `Bearer ${token}`}}
    return axios.delete(`${deleteGamesURL}/${gameId}`, header)
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
}

export const rateGame= (gameId,userId,score,token) => {
    const header = {headers: {Authorization: `Bearer ${token}`}}
    const data = {
        userId:userId,
        gameId:gameId,
        score:score

    };
    return axios.post(`${ratingGameURL}`,data, header)
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
}