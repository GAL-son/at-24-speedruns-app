import { Outlet, useLoaderData, useNavigation } from "react-router-dom";

import Navbar from "../components/navbar";
import Footer from "../components/footer";

import './css/layout.css'

export async function loader() {
    const token = await localStorage.getItem('token');

    return {token: token}
}


export default function Layout()  {
    const navigation = useNavigation();

    const {token} = useLoaderData()

    return(
        <>
            <div className={"loading-text " + ((navigation.state === 'loading') ? "" : "loading-hidden")}>
                Loading...
            </div>
            <div className={"main d-flex flex-column justify-content-between " }>
                <div>
                    <Navbar token={token}/>
                    <div className={"content"}>
                        <Outlet/>
                    </div>
                </div>
                <Footer/>
            </div>
        </>
    )
}