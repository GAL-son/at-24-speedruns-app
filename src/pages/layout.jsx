import { Outlet } from "react-router-dom";

import Navbar from "../components/navbar";
import Footer from "../components/footer";

import './css/layout.css'


export default function Layout()  {
    return(
        <div className="main">
            <Navbar/>
            <div className="content">
                <Outlet/>
            </div>
            <Footer/>
        </div>
    )
}