import './css/time.css'

export default function Time(props) {
    const {content, index} = props
    
    return (
        <div className="time-main d-flex flex-row align-items-center justify-content-between">
            {(index!==undefined) && 
            <div className='time-index'>{index+1}.</div>}
            
            <div className='time-user'>USER</div> 
            
            <div className='time-time'>TIME</div> 
            <div className="time-game d-flex flex-row align-items-center">
                
                <img src="https://static.posters.cz/image/1300/plakaty/call-of-duty-mw3-cover-i11163.jpg" alt="" />
                <div className='' >GameGameGameGameGameGameGameGame</div>
            </div>
            
            
             <span>{content}</span>
        </div>
    )
}