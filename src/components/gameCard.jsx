import './css/gameCard.css'
import GameCover from './gameCover'

export default function GameCard(props) {
    const {content} = props

    return (
        <div className='gameCard'>
            <GameCover content={{image: content.image}}/>
            <div className='gameCard-info gradient-hover d-flex flex-column align-items-center justify-content-end'>
                <span>{content.name}</span>
            </div>
        </div>
    )
}