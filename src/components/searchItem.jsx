import './css/searchItem.css'
import noCover from '../assets/images/holders/noCover.png'

export default function searchItem(props) {
    const {content} = props;
    console.log(props)

    return(
        <div className="d-flex flex-row w-50">
            <div className="gameCover">
                <img src={content.image} alt="" onError={({currentTarget}) => {
                currentTarget.onError = null;
                currentTarget.src = noCover;}}/>
            </div>
            <div className="flex-grow-1 d-flex flex-column justify-content-left align-items-left pt-2">
                <h4>{content.name}</h4>
                <p>- {content.releaseYear} -</p>
                <div className='d-flex flex-row flex-wrap'>
                    {content.gameOnPlatforms.map(p => {
                        return(
                            <div className={'badge badge-pill ' + p.name.toLowerCase()}>{p.name}</div>
                        )
                    })}
                </div>
                <span>{content.averageRating}</span>
            </div>
        </div>
    )
}