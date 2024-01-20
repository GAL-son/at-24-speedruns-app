
import mobileBadge from '../assets/images/badge_mobile_small.png'
import consoleBadge from '../assets/images/badge_console_small.png'
import pcBadge from '../assets/images/badge_pc_small.png'
import './css/platformBadge.css'

export default function PlatformBadge(params) {
    const {name, type} = params
    const mapImage =() => {
        switch (type) {
            case "MOBILE":
                return mobileBadge;
            case "CONSOLE":
                return consoleBadge;    
            case "PC":
                return pcBadge;
            default:
                return consoleBadge;
                break;
        }
    }
    
    return (
        <div className={'d-flex flex-row align-items-center badge badge-pill ' + name.toLowerCase()}>
            <img src={mapImage()}></img>
            {name}
        </div>
    )
}