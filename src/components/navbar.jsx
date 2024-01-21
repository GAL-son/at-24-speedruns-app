
import { Link } from 'react-router-dom'

import { getGames } from './API/GamesMenager'

import Search from './search'

import './css/navbar.css'
import searchItem from './searchItem'

export default function Navbar() {

    const searchFilter = (querry) => {
        return ((game) => {
            
            const qWords = querry.toLowerCase().split(' ');
            const gameWords = game.name.toLowerCase().split(' ');
            const areWords = gameWords.some(item => qWords.includes(item));
            const otherSearch = (game.name.toLowerCase().indexOf(querry.toLowerCase()) > -1)
            return areWords || otherSearch;
        })
    }
    
    return(
        <nav className="navbar navbar-dark navbar-expand-lg">
            <div className="d-flex flex-row justify-content-between align-items-center w-100">
                <div className='ms-2 d-flex flex-row flex-shrink-1'>
                    <Link to={"/"} className="navbar-brand">Speedruns</Link>
                    <div className="navbar-nav">
                        <Link to={"/games"} className="nav-link" aria-current="page" href="#">All games</Link>
                    </div>
                </div>

                {/* SEARCH COMPONENT */}
                <div className='w-50 search-nav'><Search 
                    isDropdown={true}
                    searchFilter={searchFilter}
                    dropdownDataSource={getGames}
                    dropdownItem={searchItem}
                    searchHint={"Search games..."}
                /></div>

                {/* Account info Component */}
                <Link to='login' className='btn btn-login me-2'>ACCOUNT INFO</Link>

            </div>
        </nav>
    )
}