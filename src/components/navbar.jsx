import './css/navbar.css'

export default function Navbar() {

    return(
        <nav className="navbar navbar-dark navbar-expand-lg">
            <div className="d-flex flex-row justify-content-between align-items-center w-100">
                <div className='ms-2 d-flex flex-row flex-shrink-1'>
                    <a className="navbar-brand">Navbar</a>
                    <div className="navbar-nav">
                        <a className="nav-link" aria-current="page" href="#">Home</a>
                    </div>
                </div>

                {/* SEARCH COMPONENT */}
                <form className="d-flex ">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>

                {/* Account info Component */}
                <div className='me-2'>ACCOUNT INFO</div>

            </div>
        </nav>
    )
}