import { useState } from "react";

import scoreFull from '../assets/images/scoreFull.png'
import scoreEmpty from '../assets/images/scoreEmpty.png'


export default function GameScorer(params) {
    const {callback} = params;

    const [hoverVal, setHoverVal] = useState(0)
    const [savedVal, setSavedVal] = useState(-10)

    const [isHovered, setisHovered] = useState(true)

    const getImage = (index) => {
        if(isHovered) {
            if(index > hoverVal) {
                return scoreEmpty
            } else {
                return scoreFull;
            }
        }

        if(index > savedVal) {
            return scoreEmpty
        } else {
            return scoreFull;
        }
    } 

    return(
        <div className="score-counter d-flex flex-row align-items-center"
            onMouseEnter={e => {setisHovered(true)}}
            onMouseLeave={e => {setisHovered(false)}}
        >
            <div className="score-icons d-flex flex-row align-items-center">
                {[...Array(10)].map((x,i) => {
                    return (
                        <div 
                            onClick={e => {
                                if(i !== savedVal) {
                                    callback(i)
                                }
                                setSavedVal(i)
                            }}
                            className="score-img"
                            onMouseEnter={(e) => {
                                setHoverVal(i)
                            }}
                        >
                            <img src={getImage(i)} alt={"scoreImage"} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
    
}