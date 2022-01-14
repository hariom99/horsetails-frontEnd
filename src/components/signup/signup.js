import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./signup.css";

const Signup = () => {
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    const [regMsg, setRegMsg] = useState(null);
    const history = useHistory();
    // localStorage.setItem("hi", "hello");
    // console.log(localStorage.getItem("hi"));
    const signup = (e) => {
        e.preventDefault();
        const payLoad = { email, password };

        if (email === "") {
            setRegMsg("please enter valid username");
        }
        else if (password === "")
            setRegMsg("please enter valid password");
        else {

            axios.post("http://localhost:8080/register/"
                , payLoad).then((res) => {
                    if (res.data.data === undefined)
                        setRegMsg("Already registered !");
                    else {
                        localStorage.setItem("token", res.data.data.token)
                        // console.log(res.data.data.payload.id);
                        localStorage.setItem("userId", res.data.data.payload.id)
                        // console.log(res.data.data);
                        history.push("/myboards");
                    }
                }).catch((err) => {
                    console.log(err);
                })
        }
    }
    return (<div className="signup-container" >
        <div className="login-signup" >
            <span><Link to="/login">Login</Link>
            </span>
        </div>
        <div className="sign-up" >
            Signup
            <form>
                <div className="input-fields" >
                    <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email ID" type="email" />

                    <input value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="" placeholder="Password" type="password" />

                    <div>
                        <button onClick={signup} type="submit" className="btn-ls" >SIGN UP</button>
                    </div>
                </div>
            </form>
            <div className="board-warning" >{regMsg}</div>
        </div>
    </div>);
}

export default Signup;