import './css/user.css'
import starGray from '../assets/images/starGrayIcon.png'
import star from '../assets/images/starIcon.png'
import wrench from '../assets/images/wrench.png'

import { useLoaderData } from "react-router-dom";
import { getUser } from "../components/API/userMenager";
import { decodeToken, isExpired } from "react-jwt";
import { getRuns } from "../components/API/RunsMenager";

import { deleteFollow, followUser, getFollows, getFollowsForUser } from '../components/API/followMenager';
import { useEffect, useState } from 'react';

import List from "../components/list";
import PlatformBadge from "../components/platformbadge";
import Time from "../components/time";
import GameCard from '../components/gameCard';

export async function loader({params}) {
    const {id} = params;

    const user = await getUser(id)
    const token = await localStorage.getItem('token')
    const runs = await getRuns().then(data => {
        return data.filter(x => {
            return x.user.userId == id;
        })
    })

    let follows = await getFollowsForUser(id, token)
    console.log("MYFOLLOWS", follows)
    if(follows === undefined) {
        follows=[]
    }
    console.log("MYFOLLOWS", follows)

    return {user, token, runs, follows}
}

export default function User() {

    const {user, token, runs, follows} = useLoaderData()
    const [follow, setFollow] = useState(false)

    const stortByDate = (a, b) => {
        return new Date(b) - new Date(a);
    }

    useEffect(() => {
        const setFollowers = async () => {
            console.log(token)
            console.log(isExpired(token))

            if(!isExpired(decodeToken(token))) {
                setFollow(false);
                return
            }

            const myFollows = await getFollows(token)
            const followIds = follows.map(x => x.following.id)

            console.log(myFollows)

            if(followIds.findIndex(o => o = user.userId) >= 0 || user.userId == decodeToken(token).id) {
                setFollow(true)
            } else {
                setFollow(false)
            }
        }

        setFollowers()
        
    }, [])

    const getUserGames = () => {
        const games = runs.map(x => {
            return x.game
        })

        // console.log(games)

        const ids = games.map(({ gameId }) => gameId);
        const filtered = games.filter(({ gameId }, index) =>
            !ids.includes(gameId, index + 1));


        return filtered
    }

    return(
        <div className='user d-flex flex-row justify-content-between'>
            <div className='user-info d-flex flex-column'>
                <div className='user-bar d-flex flex-row align-items-center justify-content-center'>
                    {(user.role == "ADMIN") && 
                        <div className='admin-icon me-3'>
                            <img src={wrench} alt="ADMIN" />
                        </div>
                    }
                    <h1  className='user-name'>{user.login}</h1>
                    
                    <div className='follow-icon' onClick={e => {
                        if(user.userId == decodeToken(token).id) return;
                        if(follow) {
                            followUser(decodeToken(token).id, user.userId, token).then(x => {
                                console.log(x)
                                setFollow(follow)
                            }).catch(err => {
                                console.error(err)
                                setFollow(!follow)
                            })    
                        } else {
                            deleteFollow(decodeToken(token).id, user.userId, token).then(x => {
                                setFollow(!follow)
                            })
                        }
                        
                    }}>
                        <img src={(follow) ? star : starGray} alt=""/>
                    </div>
                </div>
                {(user.userId == decodeToken(token).id) && 
                <div>
                    <div>Myself</div>
                    <h4>Follows</h4>
                    {follows.map(x => {
                        return <div>{JSON.stringify(x)}</div>
                    })}
                </div>
                }
            </div>

            <div className='user-rest'>
                <div className='games-container'>
                    <h2 className='text-center'>Games</h2>
                    <div className='game-cards w-100 d-flex flex-row flex-wrap justify-content-center small'>
                        <List content={getUserGames()} Item={GameCard}></List>
                    </div>
                </div>
                <div className='times'>
                    <h2 className='text-center'>Runs</h2>
                    <div className='heading'>
                        <Time 
                        disableLink={true}
                        content={{
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
                    </div>     
                    <List content={runs.sort((a,b) => {
                        return stortByDate(a.date, b.date)
                    }).map((x, i) => {
                        return {
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
    )

}