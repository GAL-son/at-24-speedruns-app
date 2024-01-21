import './css/login.css'
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {loginCall}  from "../components/API/userMenager";
import {Badge} from "react-bootstrap";

export default function Login() {
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [emptyInput,setEmptyInput]=useState(false)
    const emptyInputStyling={borderColor:'red'}
    const inputNonEmptyStyling={}
    const [inputStyling,setInputStyling]=useState({})
    const navigation=useNavigate()
    const [displayedAlert,setDisplayedAlert]=useState("")


    const handleChange = (event) => {
        setDisplayedAlert("")
        const {id, value} = event.target;
         setEmptyInput(false)
        setInputStyling(inputNonEmptyStyling)
        if (id === "login") {
            setLogin(value);
        } else if (id === "password") {
            setPassword(value);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (login===""||password==="")
        {
            setEmptyInput(true)
            setInputStyling(emptyInputStyling)
            setDisplayedAlert(" missing data")
            return
        }
       // console.log(login, password)
        await loginCall (login,password)
            .then((data)=>{
                console.log(data)
                if(data!==null&&typeof(data)!=="undefined")
                {
                    if (data!==""){

                        try {
                            localStorage.setItem("token", String(data))
                        }
                        catch (error)
                        {
                            console.log(error)
                        }
                        finally {
                            navigation("/")
                            window.location.reload()
                        }
                    }
                }else {

                    setDisplayedAlert("bad credentials")
                }

                }
            )


    }


    return (<div>

            <form className={"form_basic"} onSubmit={handleSubmit}>
                <div className={"form_Line"}><h2>Log in:</h2></div>
                <div className={"form_Line"}>
                    <label htmlFor={login}>login:</label>
                    <input className={"form-control input_basic"} style={inputStyling} id={"login"} value={login} type={"text"}
                           onChange={handleChange}/>
                </div>
                <div className={"form_Line"}>
                    <label htmlFor={password}>password:</label>
                    <input className={"form-control input_basic"} style={inputStyling} id={"password"} value={password} type={"password"}
                           onChange={handleChange}/>
                </div>
                <div className={"form_Line_buttons"} style={{}}>
                    <button className={" btn btn-success form_button"} type={"submit"}>log in</button>
                    <Link to={"/register"}>
                    <button className={"btn btn-success  form_button"} type="button"
                           >Registration
                    </button>
                    </Link>
                </div>
                {(displayedAlert!=="")?(<div className={"form_Line alert alert-danger"}>{displayedAlert}</div>):""}
            </form>
        </div>

    )
}