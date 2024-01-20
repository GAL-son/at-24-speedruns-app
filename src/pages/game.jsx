import { useLoaderData } from "react-router-dom"
import { getGameRuns, getGame } from "../components/API/GamesMenager"

import './css/game.css'
import GameCover from "../components/gameCover"
import ScoreCounter from "../components/scoreCounter"
import PlatformBadge from "../components/platformbadge"
import Time from '../components/time'
import List from "../components/list"




export async function loader({params}) {
    const gameData = await getGame(params.id)
    const gameRuns = await getGameRuns(params.id)


    return {
        game: gameData,
        runs: gameRuns,
    }
}

export default function Game() {
    const {game, runs} = useLoaderData()

    return(
        <div className="game d-flex flex-column">

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
                            runs.map((x,i) => {
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
                        <div>
                            NO RUNS YET
                        </div>
                    }   

                </div>
                
            </div>

        </div>
    )

}   