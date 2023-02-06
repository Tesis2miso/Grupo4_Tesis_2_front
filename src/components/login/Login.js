import { useState, Fragment } from 'react';
import axios from "axios";
import './Login.css';

function Login(props) {

    const [loginForm, setloginForm] = useState({
        email: "",
        password: ""
    })

    function logMeIn(event) {
        axios({
            method: "POST",
            url: "/specialist/login",
            data: {
                email: loginForm.email,
                password: loginForm.password
            }
        })
            .then((response) => {
                props.setToken(response.data.access_token)
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                }
            })

        setloginForm(({
            email: "",
            password: ""
        }))
        
        event.preventDefault()
    }

    function handleChange(event) {
        const { value, name } = event.target
        setloginForm(prevNote => ({
            ...prevNote, [name]: value
        })
        )
    }

    return (
        <Fragment>
            <form className="login">
                <h1>DermoApp</h1>
                <input onChange={handleChange}
                    type="email"
                    text={loginForm.email}
                    name="email"
                    placeholder="Email"
                    value={loginForm.email} />
                <input onChange={handleChange}
                    type="password"
                    text={loginForm.password}
                    name="password"
                    placeholder="Password"
                    value={loginForm.password} />

                <button onClick={logMeIn}>Submit</button>
            </form>
        </Fragment>
    );
}

export default Login;