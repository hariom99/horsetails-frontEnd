import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = (props) => {
    // console.log(props);
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    const [logMsg, setLogMsg] = useState(null);

    const login = (e) => {
        e.preventDefault();
        const url = "http://localhost:8080/login/";
        if (email === "" || password === "") {
            setLogMsg("Fields cannot be empty")
        }
        else {

            axios.post(url, { email, password }).then((res) => {
                // console.log(res.data.data);
                localStorage.setItem("token", res.data.data.token);
                props.history.push("/myboards");
            }).catch((err) => {
                setLogMsg("invalid credentials !")
                // console.log(err);
            })
        }
    }
    return (<div className="signup-container" >
        <div className="login-signup" >
            <span><Link to="/">Signup</Link>
            </span>
        </div>
        <div className="sign-up" >
            Login
            <form>
                <div className="input-fields" >
                    <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email ID" type="email" />

                    <input value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="" placeholder="Password" type="password" />

                    <div>
                        <button onClick={login} type="submit" className="btn-ls" >LOGIN</button>
                    </div>
                </div>
            </form>
            <div className="board-warning" >{logMsg}</div>
        </div>

    </div>);
}

export default Login;