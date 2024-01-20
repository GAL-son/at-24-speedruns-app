import { useState } from "react";

import './css/scoreCounter.css'

import scoreFull from '../assets/images/scoreFull.png'
import scoreHalf from '../assets/images/scoreHalf.png'
import scoreEmpty from '../assets/images/scoreEmpty.png'

export default function ScoreCounter(params) {
    const {value} = params;

    const getImage = (index) => {
        const imageValue = value-index;

        if(imageValue >= 1) {
            return scoreFull;
        } else if (imageValue >= 0.5) {
            return scoreHalf;
        } else {
            return scoreEmpty;
        }
    }

    return(
        <div className="score-counter d-flex flex-row align-items-center">
            <div className="score-value">{parseFloat(value).toFixed(2)}</div>
            <div className="score-icons d-flex flex-row align-items-center">
                {[...Array(10)].map((x,i) => {
                    return (
                        <div className="score-img">
                            <img src={getImage(i)} alt={"scoreImage"} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}