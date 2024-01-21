import { useLoaderData } from "react-router-dom"
import { getGameRuns, getGame } from "../components/API/GamesMenager"

import './css/game.css'
import GameCover from "../components/gameCover"
import ScoreCounter from "../components/scoreCounter"
import PlatformBadge from "../components/platformbadge"
import Time from '../components/time'
import List from "../components/list"
import { parse } from "tinyduration"
import { decodeToken } from "react-jwt"
import { useState } from "react"

export async function loader({params}) {
    const gameData = await getGame(params.id)
    const gameRuns = await getGameRuns(params.id)
    let token = await localStorage.getItem("token");

    

    if(token !== null) {
        token = decodeToken(token)
    }

    return {
        user: {
            loggedIn: token !== null || true,
            token: token,
        },
        game: gameData,
        runs: gameRuns,
    }
}

export default function Game() {
    const {game, runs, user} = useLoaderData()
    const [addRunVisible, setAddRunVisible] = useState(false)

    const [formHours, setFormHours] = useState(0)
    const [formMinutes, setFormMinutes] = useState(0)
    const [formSecons, setFormSeconds] = useState(0)


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
                            <div className=" user-control-score d-flex flex-column align-items-center">
                                <h4 className="">Rate this game</h4>
                                <ScoreCounter value={game.averageRating}/>
                            </div>
                            <div className="d-flex flex-row mb-3 justify-content-center" >
                                <h4 className="">Add your run</h4>
                            </div>
                            <form className={"game-form d-flex flex-row justify-content-around " + ((addRunVisible) ? "" : 'form-hidden')}>
                                <div className="game-form-time d-flex flex-column align-items-left align-items-center">
                                    <h4>Time</h4>
                                    <div className="d-flex flex-column">
                                        <div className="d-flex flex-row justify-content-between align-items-center text-center">
                                            <label htmlFor="">Hours</label>
                                            <input className="form-control form-narrow" value={formHours} onChange={(e) => {
                                                (e.target.value >= 0 ) && setFormHours(e.target.value)
                                            }} type="number" name="" id="game-form-hours" />
                                            
                                        </div>
                                        <div className="d-flex flex-row align-items-center justify-content-between text-center">
                                            <label htmlFor="">Minutes</label>
                                            <input className="form-control form-narrow" type="number" value={formMinutes} onChange={(e) => {
                                                (e.target.value >= 0) && setFormMinutes(e.target.value)
                                            }} name="" id="game-form-minutes" />
                                        </div>
                                        <div className="d-flex flex-row align-items-center text-center justify-content-between">
                                            <label htmlFor="">Seconds</label>
                                            <input className="form-control form-narrow" value={formSecons} onChange={(e) => {
                                                (e.target.value >= 0 ) && setFormSeconds(e.target.value)
                                            }}  type="number" name="" id="game-form-hours" />
                                        </div>
                                    </div>
                                </div>
                                <div className="game-form-time d-flex flex-column align-items-center">
                                    <h4>Type</h4>
                                    <select className="form-select form-narrow" name="" id="">
                                        <option>New</option>
                                        {[...new Set(runs)].map(x => {
                                            return <option value={x}>
                                                {x.type}
                                            </option>
                                        })}
                                    </select>
                                </div>
                                <div className="game-form-time d-flex flex-column align-items-center">
                                    <h4>Platform</h4>
                                    <select className="form-select form-narrow" name="" id="">
                                        {game.gameOnPlatforms.map(x => {
                                            return <option>
                                                {x.name}
                                            </option>
                                        })}
                                    </select>
                                </div>
                                <div className="game-form-time d-flex flex-column align-items-center">
                                    <h4>Video</h4>
                                    <input className={"form-control"}type="text" name="" id="" placeholder="Youtube, Vimeo, ect..."/>
                                </div>    
                            </form>
                            <div className="d-flex flex-row justify-content-evenly">
                                <div onClick={(e) => {
                                    if(addRunVisible) {

                                    } else {
                                        setAddRunVisible(true)
                                    }
                                }} className={"btn btn-dark text-center " + ((addRunVisible) ? "btn-submit" : "")}>{(!addRunVisible) ? "Add run" : "Submit run"}</div>
                                {(addRunVisible) && 
                                    <>
                                        <div onClick={(e) => {
                                        }} className="btn btn-dark text-center btn-clear">Clear
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