import './css/searchItem.css'
import GameCover from './gameCover';

import mobileBadge from '../assets/images/badge_moblie.png'
import PlatformBadge from './platformbadge';
import { Link } from 'react-router-dom';


export default function searchItem(props) {
    const {content} = props;
    
    return(
       <Link to={`\game\${content.id}`} className='d-flex text-decoration-none w-50'>
        <div className="d-flex flex-row">
            <div className="gameCover">
                <GameCover content={{image: content.image}}/>
            </div>
            <div className="flex-grow-1 d-flex flex-column justify-content-left align-items-left pt-2">
                <h5>{content.name}</h5>
                <p className='item-year'>- {content.releaseYear} -</p>
                <div className='d-flex flex-row flex-wrap'>
                    {content.gameOnPlatforms.map(p => {
                        return(
                            <PlatformBadge name={p.name} type={p.type}/>
                        )
                    })}
                </div>
                <span>{content.averageRating}</span>
            </div>
        </div></Link>
    )
}