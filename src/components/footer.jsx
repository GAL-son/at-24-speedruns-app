import './css/footer.css'

export default function Footer() {
    return(
        <footer className="d-flex p-3 flex-column align-items-center">
            <div className='authors d-flex flex-row justify-content-center'>
                <span>Authors:</span>
                <a href='https://github.com/ldgeyexea'>Dawid Piotr</a>
                <a href='https://github.com/GAL-son'>Gala Bartłomiej</a>
                <a href='https://github.com/pawel-hajdo'>Hajdo Paweł</a>
            </div>
            <div>
            Project avaliable at: 
            </div>
            <div className='git d-flex flex-row align-items-center'>
                <a className="" href="https://github.com/pawel-hajdo/Speedrun-Database">
                    <div className='d-flex flex-column align-items-center'>
                        <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="" />
                        Server                   
                    </div>
                </a>
                <a href="https://github.com/GAL-son/speedruns-app-at24">
                    <div className='d-flex flex-column align-items-center'>
                        <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="" />
                        Application                   
                    </div>
                </a>
            </div>
        </footer>
    )
}