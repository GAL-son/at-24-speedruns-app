import { Link } from 'react-router-dom'
import { parse } from 'tinyduration'

import './css/time.css'
import GameCover from './gameCover'
import crossIcon from '../assets/images/crossIcon.png'
import checkIcon from '../assets/images/checkIcon.png'
import trophyGold from '../assets/images/trophyGold.png'
import trophySilver from '../assets/images/trophySilver.png'
import trophyBronze from '../assets/images/trophyBronze.png'

export default function Time(props) {
    const {content, index, disableLink} = props

    const parseTime = () => {
        const t = content.time;
        let pt = {}
        try {
            pt = parse(t)

        } catch (error) {
            return t;
        }
        let result = ''
        Object.keys(pt).forEach(key => {
            const val = pt[key]
            result += val+ key.substring(0, 1) + " "
        })        

        return result;
    }

    const indexGraphichs = () => {        
        switch (content.index) {
            case 1:
                return <img src={trophyGold} alt="gold"/>
            case 2:
                return <img src={trophySilver} alt="silver"/>
            case 3:
                    return <img src={trophyBronze} alt="bronze"/>
            default:
                return content.index
        }
    }
    
    return (
        <div className="time-main d-flex flex-row align-items-center justify-content-between">
            <div className='d-flex flex-row align-items-center justify-content-between flex-grow-1'>
                {(content.index !== undefined) && 
                    <div className='time-index'>{indexGraphichs()}</div>
                }
                <div className='time-user'>{content.user}</div> 
                <div className='time-time'>{parseTime()}</div> 
                <div className='time-type'>{content.type}</div>
                <div className='time-platform d-flex flex-row justify-content-center'>{content.platform}</div>
                <div className='time-date'>{content.date}</div>
            </div>
            {(content.game !== undefined) && 
                <Link to={"/games/" + content.game.gameId} className={"time-game d-flex flex-row align-items-center " + ((disableLink) ? "disabled-link" : "")}>
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