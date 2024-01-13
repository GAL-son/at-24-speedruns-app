
import List from '../components/list'
import Time from '../components/time'
import './css/home.css'

export function loader() {
    
}

export default function Home() {

    return(
        <div className="d-flex flex-row">

            <div className="home-main me-3 d-flex flex-column">
                <div>
                    New entries
                    <div>
                        <List content={[1,2,3,4,5]} Item={Time}/>
                    </div>
                </div>
            </div>

            <div className="side d-flex flex-column">
                <div>
                    Popular games


                </div>
                <div>
                    Most active users
                </div>
            </div>

        </div>
    )
}