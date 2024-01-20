
import { useLoaderData } from 'react-router-dom';
import {getGames} from '../components/API/GamesMenager'

import List from '../components/list'
import Time from '../components/time'
import './css/home.css'
import GameCover from '../components/gameCover';
import GameCard from '../components/gameCard';
import PlatformBadge from '../components/platformbadge';
import { getRuns } from '../components/API/RunsMenager';

export async function loader() {
    let games = await getGames();
    let runs = await getRuns();
    games = games.slice(0,6)
    return {games, runs};
}   

export default function Home() {

    const {games, runs} = useLoaderData()

    return(
        <div className="d-flex flex-row">

            <div className="home-main me-3 d-flex flex-column">
                <div>
                    <h2>New entries</h2>
                    <Time 
                                content={{
                                    index: "#",
                                    user: 'Username',
                                    time: 'Time',
                                    type: 'Type',
                                    date: 'Date',
                                    platform: 'Platform',
                                    verified: "Verified",
                                    noImage: true,
                                    game: {
                                        name: "Game"
                                    }
                                }}
                            /> 
                    <div>
                        <List content={runs.map((x, i) => {
                            return {
                                index: i+1,
                                user: x.user.login,
                                time: x.time,
                                type: x.type,
                                date: x.date.substring(0, 19).replace('T', " "),
                                platform: <PlatformBadge name={x.platform.name} type={x.platform.type}/>,
                                game: x.game,
                                verified: x.confirmedBy,
                            }
                        })} Item={Time}/>
                    </div>
                </div>
            </div>

            <div className="side flex-grow-1 w-25 d-flex flex-column">
            <h2>New games</h2>
                <div className='game-cards w-100 d-flex flex-row flex-wrap justify-content small'>
                <List content={games.sort((a,b) => {return b.releaseYear - a.releaseYear})} Item={GameCard}></List>
                   
                </div>
                <div>
                    Most active users Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci placeat nulla esse quo suscipit cupiditate voluptas fugit, doloribus, vel voluptates odio labore nisi ullam tempore sed magni maxime sint debitis.
                </div>
            </div>

        </div>
    )
}