import './css/footer.css'

export default function Footer() {
    return(
        <footer className="d-flex p-3 flex-column align-items-center">
            <div className='d-flex flex-row justify-content-between'>
                <span>Authors:</span>
                <div>Dawid Piotr</div>
                <div>Gala Bartłomiej</div>
                <div>Hajdo Paweł</div>
            </div>
            <div>
                Project avaliable at: 
            </div>
        </footer>
    )
}