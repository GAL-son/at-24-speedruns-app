
import { useLoaderData } from 'react-router-dom';
import {getGames} from '../components/API/GamesMenager'

import List from '../components/list'
import Time from '../components/time'
import './css/home.css'
import GameCover from '../components/gameCover';
import GameCard from '../components/gameCard';

export async function loader() {
    let games = await getGames();
    games = games.slice(0,6)
    return {games};
}   

export default function Home() {

    const {games} = useLoaderData()

    return(
        <div className="d-flex flex-row">

            <div className="home-main me-3 d-flex flex-column">
                <div>
                    <h2>New entries</h2>
                    <div>
                        <List content={[1,2,3,4,5]} Item={Time}/>
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