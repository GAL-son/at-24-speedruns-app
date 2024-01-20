import { Link } from 'react-router-dom'

import './css/time.css'
import GameCover from './gameCover'
import crossIcon from '../assets/images/crossIcon.png'
import checkIcon from '../assets/images/checkIcon.png'

export default function Time(props) {
    const {content, index} = props
    
    return (
        <div className="time-main d-flex flex-row align-items-center justify-content-between">
            <div className='d-flex flex-row align-items-center justify-content-between flex-grow-1'>
                <div className='time-index'>{content.index}</div>
                <div className='time-user'>{content.user}</div> 
                <div className='time-time'>{content.time}</div> 
                <div className='time-type'>{content.type}</div>
                <div className='time-platform d-flex flex-row justify-content-center'>{content.platform}</div>
                <div className='time-date'>{content.date}</div>
            </div>
            {(content.game !== undefined) && 
                <Link to={"/games/" + content.game.gameId} className="time-game d-flex flex-row align-items-center">
                   {(content.noImage === undefined) && 
                    <GameCover content={{image: content.game.image}}/>}
                    <div className='text-center flex-grow-1' >{content.game.name}</div>
                </Link>
            }
            <div className='time-verified d-flex flex-row justify-content-center'>
                {(!isNaN(content.verified)) ? 
                <img src={(content.verified>0) ? checkIcon : crossIcon} alt="" />:
                content.verified}
            </div>
        </div>
    )
}