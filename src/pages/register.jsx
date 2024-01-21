import './css/login.css'
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {loginCall} from "../components/API/userMenager";
import {register} from "../components/API/userMenager";
export default function Register(){
    const [login,setLogin]=useState("")
    const [password,setPassword]=useState("")
    const [passwordRep,setPasswordRep]=useState("")
    const [email,setEmail]=useState("")

    const [emptyInput,setEmptyInput]=useState(false)
    const emptyInputStyling={borderColor:'red'}
    const inputNonEmptyStyling={}
    const [inputStyling,setInputStyling]=useState({})
    const navigation=useNavigate()
    const [displayedAlert,setDisplayedAlert]=useState("")

    const handleChange = (event) => {
        setDisplayedAlert("")
        setInputStyling(inputNonEmptyStyling)
        const { id, value } = event.target;
        if (id === "login") {
            setLogin(value);
        } else if (id === "password") {
            setPassword(value);
        } else if (id === "passwordRep") {
            setPasswordRep(value);
        }else if (id=== "email")
        {
            setEmail(value)
        }
    };
    const handleSubmit=async (event)=>
    {
        event.preventDefault()
        if (login===""||password===""||email===""||passwordRep==="")
        {
            setEmptyInput(true)
            setInputStyling(emptyInputStyling)
            setDisplayedAlert(" missing data")
            return
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setDisplayedAlert("Invalid email address");
            return;
        }
        if(password!==passwordRep)
        {
            setDisplayedAlert("passwords dont match")
            return
        }
        event.preventDefault()
        console.log(login,password,passwordRep,email)
        await register(login,email,password,'USER')
            .then((data)=>{
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
                            }
                        }
                    }else {

                        setDisplayedAlert("email or login alredy in use")
                    }

                }
            )
    }



    return(<div>

            <form className={"form_basic"} onSubmit={handleSubmit}>
                <div className={"form_Line"}><h2>Register:</h2></div>
                <div className={"form_Line"}>
                    <label htmlFor={login}>Login:</label>
                    <input className={"form-control input_basic"} style={inputStyling} id={'login'} value={login} type={"text"} onChange={handleChange}/>
                </div>
                <div className={"form_Line"}>
                    <label htmlFor={email}>E-mail:</label>
                    <input className={"form-control input_basic"} style={inputStyling} id={'email'} value={email} type={"text"} onChange={handleChange}/>
                </div>
                <div className={"form_Line"}>
                    <label htmlFor={password}>Password:</label>
                    <input className={"form-control input_basic"} style={inputStyling} id={'password'} value={password} type={"password"} onChange={handleChange}/>
                </div>
                <div className={"form_Line"}>
                    <label htmlFor={passwordRep}>Repeat password:</label>
                    <input className={"form-control input_basic"} style={inputStyling} id={'passwordRep'} value={passwordRep} type={"password"} onChange={handleChange}/>
                </div>
                <div className={"form_Line_buttons"} style={{}}>
                    <button className={" btn btn-success form_button"}  type={"submit"}>Create account</button>
                    <Link to={"/login"}>
                        <button className={"btn btn-success  form_button"} type="button">
                            I have an acocunt
                        </button>
                    </Link>

                </div>
                {(displayedAlert!=="")?(<div className={"form_Line alert alert-danger"}>{displayedAlert}</div>):""}
            </form>
        </div>

    )
}