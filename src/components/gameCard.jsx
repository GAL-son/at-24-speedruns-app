import { Link } from 'react-router-dom'
import './css/gameCard.css'
import GameCover from './gameCover'
import PlatformBadge from './platformbadge'
import ScoreCounter from './scoreCounter'

export default function GameCard(props) {
    const {content} = props

    return (
        <Link to={"/games/" + content.gameId} className='game-card'> 
            <GameCover content={{image: content.image}}/>
            <div className='game-card-info d-flex flex-column lign-items-center justify-content-end'>
                <h5 className='d-flex flex-column justify-content-center align-items-center game-card-title'>
                    <span className='text-center w-100'>
                    {content.name}
                    </span>
                </h5>
                <div className='game-card-hidden d-flex flex-column'>
                    <div className='game-card-year text-center'>
                        -{content.releaseYear}-
                    </div>
                    <div className='game-card-score'>
                        <ScoreCounter value={content.averageRating}/>
                    </div>
                    <div className='game-card-desc'>
                        {content.description.substring(0, 80) + (content.description.length >= 80 ? "...": "")}
                    </div>
                    <div className='d-flex flex-row flex-wrap justify-content-center platform-badges'>

                        {content.gameOnPlatforms.map(p => {
                            return(
                                <PlatformBadge name={p.name} type={p.type}/>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className='gradient-hover game-card-bg-gradient'>    
            </div>
        </Link>
    )
}