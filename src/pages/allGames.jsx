import { useLoaderData } from "react-router-dom";

import { getGames } from "../components/API/GamesMenager";

import List from "../components/list";
import GameCard from "../components/gameCard";

import './css/allGames.css'

export async function loader() {
    const games = await getGames()

    return {games, }
}

export default function AllGames() {
    const {games} = useLoaderData();

    return(
        <div className="all-games-list d-flex flex-row flex-wrap">
            <List content={games} Item={GameCard}/>
        </div>
    )
}