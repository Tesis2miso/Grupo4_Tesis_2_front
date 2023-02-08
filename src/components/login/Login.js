import { useState, Fragment } from 'react';
import axios from "axios";
import './Login.css';

function Login(props) {

    const [loginForm, setloginForm] = useState({
        email: "",
        password: ""
    })
    const [error, setError] = useState();

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
                localStorage.setItem("userName", response.data.username.username)
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                }
                setError('Invalid Username or Password')
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

    document.addEventListener('DOMContentLoaded', () => {
        const miInput = document.getElementById('password');

        miInput.addEventListener('keyup', function (event) {
            if (event.getModifierState('CapsLock')) {
                setError('Alert: Caps are on');
            } else {
                setError('');
            }
        });
    });

    return (
        <Fragment>
            <form className="login">
                <h1>DermoApp</h1>
                <br></br>
                <input id="username" onChange={handleChange}
                    type="email"
                    text={loginForm.email}
                    name="email"
                    placeholder="Email"
                    value={loginForm.email} />
                <input id="password" onChange={handleChange}
                    type="password"
                    text={loginForm.password}
                    name="password"
                    placeholder="Password"
                    value={loginForm.password} />
                <div><label className='label_error'>{error}</label></div>
                <table class="tg">
                    <thead>
                        <tr>
                            <td class="tg-0pky"><button id="submitbtn1" onClick={logMeIn}>Submit</button></td>
                        </tr>
                        <tr>
                            <td class="tg-0pky"><a href='#'>Forgot password?</a></td>
                        </tr>
                    </thead>
                </table>
            </form>
        </Fragment>
    );
}

export default Login;