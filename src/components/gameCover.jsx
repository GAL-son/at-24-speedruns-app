import noCover from '../assets/images/holders/noCover.png'

export default function GameCover(props) {
    const {content} = props

    return (
        <img src={content.image} alt="" onError={({currentTarget}) => {
            currentTarget.onError = null;
            currentTarget.src = noCover;}}/>
    )
}