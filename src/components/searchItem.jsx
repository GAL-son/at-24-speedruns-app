import './css/searchItem.css'

export default function searchItem(props) {
    const {content} = props;

    return(
        <div className="d-flex flex-row w-50">
            <div className="gameCover">
                <img src="https://static.posters.cz/image/1300/plakaty/call-of-duty-mw3-cover-i11163.jpg" alt="" />
            </div>
            <div className="flex-grow-1 d-flex flex-column justify-content-left align-items-left pt-2">
                <h4>Call of Duty: Modern Warfare 3</h4>
                <p>- 2011 -</p>
                <div className='d-flex flex-row flex-wrap'>
                    <span className='badge badge-pill ps4'>PS3</span>
                    <span className='badge badge-pill xo'>XBOX 360</span>
                </div>
                <span>Number of runs</span>
            </div>
        </div>
    )
}