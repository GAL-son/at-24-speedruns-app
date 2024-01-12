import { Outlet } from "react-router-dom";

import Navbar from "../components/navbar";

import './css/layout.css'

export default function Layout()  {
    return(
        <div className="main">
            <Navbar/>
            <div className="content">
                <Outlet/>
            </div>
            <div>FOOTER</div>
        </div>
    )
}