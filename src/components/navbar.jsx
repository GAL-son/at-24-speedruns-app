import './css/navbar.css'
import Search from './search'

export default function Navbar() {

    return(
        <nav className="navbar navbar-dark navbar-expand-lg">
            <div className="d-flex flex-row justify-content-between align-items-center w-100">
                <div className='ms-2 d-flex flex-row flex-shrink-1'>
                    <a className="navbar-brand">Speedruns</a>
                    <div className="navbar-nav">
                        <a className="nav-link" aria-current="page" href="#">All games</a>
                    </div>
                </div>

                {/* SEARCH COMPONENT */}
                <div className='w-50'><Search 
                    isDropdown={true}
                    dropdownDataSource={[1,2,3,4]}
                    dropdownItem={<span>lmao</span>}
                /></div>

                {/* Account info Component */}
                <div className='me-2'>ACCOUNT INFO</div>

            </div>
        </nav>
    )
}