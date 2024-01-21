import './css/searchItem.css'
import GameCover from './gameCover';

import mobileBadge from '../assets/images/badge_moblie.png'
import PlatformBadge from './platformbadge';
import { Link } from 'react-router-dom';
import ScoreCounter from './scoreCounter';


export default function searchItem(props) {
    const {content} = props;
    
    return(
       <Link to={"/games/" + content.gameId} className='search-item d-flex text-decoration-none w-50'>
        <div className="d-flex flex-row">
            <div className="game-cover">
                <GameCover content={{image: content.image}}/>
            </div>
            <div className="flex-grow-1 d-flex flex-column justify-content-left align-items-left pt-2">
                <h5>{content.name}</h5>
                <div className='item-year'>- {content.releaseYear} -</div>
                <div className='mb-2'>
                    <ScoreCounter value={content.averageRating} />
                </div>
                <div className='mb-3'>
                {content.description.substring(0, 80) + (content.description.length >= 80 ? "...": "")}
                </div>
                <div className='d-flex flex-row flex-wrap platform-badges'>
                    {content.gameOnPlatforms.sort().map(p => {
                          return(
                            <PlatformBadge name={p.name} type={p.type}/>
                        )
                    })}
                </div>
            </div>
        </div></Link>
    )
}