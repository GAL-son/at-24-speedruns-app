import { json, useLoaderData } from "react-router-dom"
import { getGameRuns, getGame, rateGame } from "../components/API/GamesMenager"

import './css/game.css'
import GameCover from "../components/gameCover"
import ScoreCounter from "../components/scoreCounter"
import PlatformBadge from "../components/platformbadge"
import Time from '../components/time'
import List from "../components/list"
import GameScorer from "../components/gameScorer"
import { parse, serialize } from "tinyduration"
import { decodeToken, isExpired } from "react-jwt"
import { useEffect, useState } from "react"
import { addRun } from "../components/API/RunsMenager"

export async function loader({params}) {
    const gameData = await getGame(params.id)
    const gameRuns = await getGameRuns(params.id)
    let token = await localStorage.getItem("token");   

    if(token !== null) {
        token = decodeToken(token)
    }

    console.log(token)
    return {
        user: {
            loggedIn: token!== null && isExpired(token) ,
            token: token,
        },
        game: gameData,
        runs: gameRuns,
    }
}

export default function Game() {
    const {game, runs, user} = useLoaderData()
    const [addRunVisible, setAddRunVisible] = useState(false)

    // Form data
    const [formHours, setFormHours] = useState(0)
    const [formMinutes, setFormMinutes] = useState(0)
    const [formSecons, setFormSeconds] = useState(0)
    const [formType, setFormType] = useState()
    const [formData, setFormData] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0,
        type: "New",
        newType: "",
        platform: JSON.stringify(game.gameOnPlatforms[0]),
        video: ""
    })

    const [formValid, setFormValid] = useState(true)
    const [formError, setFormError] = useState("")

    const getRunTypes = () => {
        const types = [...runs.map(x => x.type)]

        return [...new Set(types)];
    }

    useEffect(() => {
        console.log(formData)
    },[formData])

    const sendForm = async () => {
        const time = serialize({
            hours: formData.hours,
            minutes: formData.minutes,
            seconds: formData.seconds
        })

        console.log(formData.platform)

        const type = (formData.type == 'New') ? formData.newType : formData.type;
        console.log(user.token.id, game.gameId, time, formData.video, type, JSON.parse(formData.platform).platformId, user.token)
        await addRun(user.token.id, game.gameId, time, formData.video, type, JSON.parse(formData.platform).platformId, user.token).then(res => {
            console.log(res)
        }).catch(err => {
            setFormError(err.message)
            console.error("EERR", err.message)
        })

        
        
    }


    const sortByDuration = (a, b) => {
        const durationToSeconds = (dur) => {
            
            dur = parse(dur)
            let time = 0
            if (dur.hours !== undefined) {
                time += dur.hours * 3600
            }
            if (dur.minutes !== undefined) {
                time+= dur.minutes * 60
            }
            if (dur.seconds !== undefined) {
                time += dur.seconds;
            }
            return time
        }

        return durationToSeconds(a) - durationToSeconds(b)
    }

    const getRunsType = () => {

    }

    return(
        <div className="game d-flex flex-column">
            {/* GAME INFO */}
            <div className="d-flex flex-row ">
                <div className="game-info d-flex flex-column">
                    <div className="game-cover">
                        <GameCover className='game-cover' content={{image: game.image}}/>
                    </div>
                    
                    <div className="info-bar d-flex flex-row justify-content-between align-items-center w-100">
                        <h2 className="w-50 text-center">
                            {game.name}
                        </h2>
                        <div className="w-50 text-center">
                            {game.releaseYear}
                        </div>
                    </div>
                    <div className="score-holder">
                        <ScoreCounter value={game.averageRating}/>
                    </div>
                    <div className='big d-flex flex-row flex-wrap justify-content-center platform-badges'>

                        {game.gameOnPlatforms.map(p => {
                            return(
                                <PlatformBadge name={p.name} type={p.type}/>
                            )
                        })}
                    </div>
                    <div className="mt-4 text-justify">
                        <p>
                            {game.description}
                        </p>
                    </div>
                </div>

                
                <div className="runs d-flex flex-column align-self-stretch flex-grow-1">

                    {/* USER CONTROLS */}
                    {user.loggedIn && 
                        <div className="game-user-actions d-flex flex-column mb-3 w-100">

                            {/* SCORE */}
                            <div className=" user-control-score d-flex flex-column align-items-center">
                                <h4 className="">Rate this game</h4>
                                <GameScorer callback={async (x) => {
                                    console.log(x+1)
                                    await rateGame(game.gameId, user.token.id, x+1, user.token)
                                        .then(res => {console.log(res)})
                                        .catch(console.err)
                                    
                                }}/>
                            </div>

                            {/* ADD RUN */}
                            <div className="d-flex flex-row mb-3 justify-content-center" >
                                <h4 className="">Add your run</h4>
                            </div>
                            {(addRunVisible && formError != "") && 
                            <div className="game-form-error ">
                                    <div className="alert alert-danger text-center">{formError}</div>
                            </div>}
                            <form className={"game-form d-flex flex-row justify-content-around " + ((addRunVisible) ? "" : 'form-hidden')}>
                            
                                <div className="game-form-time d-flex flex-column align-items-left align-items-center">
                                    <h4>Time</h4>
                                    <div className="d-flex flex-column">
                                        <div className="d-flex flex-row justify-content-between align-items-center text-center">
                                            <label htmlFor="">Hours</label>
                                            <input 
                                                className="form-control form-narrow" 
                                                value={formData.hours} 
                                                onChange={(e) => {
                                                    (e.target.value >= 0 ) && 
                                                    setFormData({...formData, hours: parseInt(e.target.value)})
                                            }} 
                                            type="number" 
                                            name="Form hours" 
                                            id="game-form-hours" />
                                            
                                        </div>
                                        <div className="d-flex flex-row align-items-center justify-content-between text-center">
                                            <label htmlFor="">Minutes</label>
                                            <input 
                                                className="form-control form-narrow" 
                                                type="number" 
                                                value={formData.minutes} 
                                                onChange={(e) => {
                                                    (e.target.value >= 0) && (e.target.value <= 59) && setFormData({...formData, minutes: parseInt(e.target.value)})
                                                }} 
                                                name="" 
                                                id="game-form-minutes" />
                                        </div>
                                        <div className="d-flex flex-row align-items-center text-center justify-content-between">
                                            <label htmlFor="">Seconds</label>
                                            <input 
                                                className="form-control form-narrow" 
                                                value={formData.seconds} 
                                                onChange={(e) => {
                                                    (e.target.value >= 0) && (e.target.value <= 59) &&  setFormData({...formData, seconds: parseInt(e.target.value)})
                                                }}  
                                                type="number" 
                                                name="form-seconds" 
                                                id="game-form-seconds" />
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex flex-column align-items-center">
                                    <h4>Type</h4>
                                    <select 
                                        onChange={e => {
                                            setFormData({...formData, type: e.target.value})
                                        }}
                                        className="form-select form-narrow" 
                                        name="form-type" 
                                        id=""
                                    >
                                        <option>New</option>
                                        {getRunTypes().map(x => {
                                            return <option>{x}</option>
                                        })}
                                    </select>
                                    {(formData.type == "New") && 
                                        <div className="mt-2 d-flex flex-column align-items-center">
                                            <input 
                                                className="form-control form-narrow ml-0"
                                                type="text" name="new-type-input" id="new-type-input" 
                                                value={formData.newType}
                                                onChange={e => {
                                                    setFormData({...formData, newType: e.target.value})
                                                }}/>
                                            <label className={"w-100 text-center"}htmlFor="new-type-in">New run type</label>
                                        </div>
                                    }
                                </div>
                                <div className="d-flex flex-column align-items-center">
                                    <h4>Platform</h4>
                                    <select 
                                        className="form-select form-narrow" 
                                        value={formData.platform}
                                        onChange={e => {
                                            setFormData({...formData, platform: e.target.value})
                                        }}
                                        name="" id="">
                                        {game.gameOnPlatforms.map(x => {
                                            return <option value={JSON.stringify(x)} {...(x.id === JSON.parse(formData.platform).platformId) && "selected"}>
                                                {x.name}
                                            </option>
                                        })}
                                    </select>
                                </div>
                                <div className="d-flex flex-column align-items-center">
                                    <h4>Video</h4>
                                    <input 
                                    className={"form-control"}
                                    value={formData.video}
                                    onChange={e => {
                                        const urlRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/


                                        setFormData({...formData, video: e.target.value})
                                    }}
                                    type="text" name="" id="" 
                                    placeholder="Youtube, Vimeo, ect..."/>
                                </div>    
                            </form>
                            <div className="d-flex flex-row justify-content-evenly">
                                <div onClick={(e) => {
                                    if(addRunVisible) {
                                        sendForm()
                                    } else {
                                        setAddRunVisible(true)
                                    }
                                }} className={"btn btn-dark text-center " + ((addRunVisible) ? "btn-submit" : "")}>{(!addRunVisible) ? "Add run" : "Submit run"}</div>
                                {(addRunVisible) && 
                                    <>
                                        <div onClick={(e) => {
                                            setFormError("")
                                            setFormData({
                                                hours: 0,
                                                minutes: 0,
                                                seconds: 0,
                                                type: "New",
                                                newType: "",
                                                platform: JSON.stringify(game.gameOnPlatforms[0]),
                                                video: ""
                                            })
                                        }} 
                                        className="btn btn-dark text-center btn-clear">Clear
                                        </div>
                                        <div onClick={(e) => {
                                            setAddRunVisible(false)
                                        }} className="btn btn-dark text-center">Hide</div>
                                    </>
                                }
                            </div>
                                
                        </div>
                    }

                    {/* RUNS */}
                    <h1 className="heading">Runs</h1>
                    <div className="tab">
                        <div className="heading">
                            <Time 
                                content={{
                                    index: "#",
                                    user: 'Username',
                                    time: 'Time',
                                    type: 'Type',
                                    date: 'Date',
                                    platform: 'Platform',
                                    verified: "Verified"
                                }}
                            />    
                        </div> 
                        <List content={
                            runs.sort((a,b) => {
                                return sortByDuration(a.time, b.time)
                            }).map((x,i) => {
                                return {
                                    index: i+1,
                                    user: x.user.login,
                                    time: x.time,
                                    type: x.type,
                                    date: x.date.substring(0, 19).replace('T', " "),
                                    platform: <PlatformBadge name={x.platform.name} type={x.platform.type}/>,
                                    verified: x.confirmedBy,
                                }
                            })
                        } Item={Time}/>
                    </div>
                    { (runs.length == 0) && 
                        <div className="no-runs">
                            NO RUNS YET
                        </div>
                    }   

                </div>
                
            </div>

        </div>
    )

}   