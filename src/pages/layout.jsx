import { Outlet, useNavigation } from "react-router-dom";

import Navbar from "../components/navbar";
import Footer from "../components/footer";

import './css/layout.css'


export default function Layout()  {
    const navigation = useNavigation();

    return(
        <div className={"main d-flex flex-column justify-content-between " }>
            <div>
            <Navbar/>
            <div className={"content"}>
                <Outlet/>
            </div>
            </div>
            <Footer/>
        </div>
    )
}