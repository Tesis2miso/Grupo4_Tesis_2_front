import { useState, Fragment } from 'react';
import axios from "axios";
import './Login.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login(props) {
    const [loginForm, setloginForm] = useState({
        email: "",
        password: ""
    })
    const [error, setError] = useState();
    const navigate = useNavigate()
    const { loggedIn } = props
    useEffect(() => {
        if (loggedIn) {
            navigate('/')
        }
    })

    function logMeIn(event) {
        event.preventDefault()
        axios({
            method: "POST",
            url: `${process.env.REACT_APP_BASE_PATH}/specialist/login`,
            data: {
                email: loginForm.email,
                password: loginForm.password
            }
        })
        .then((response) => {
            props.setToken(response.data.access_token);
            navigate('/')
        }).catch((error) => {
            setloginForm(({
                email: "",
                password: ""
            }))
            setError('Invalid Username or Password')
        })
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
                alert("Bloq Mayús esta activado");
            }
        });
    });
    
    const goToSignup = (event) => {
        event.preventDefault()
        navigate('/signup')
    }

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
                    data-testid="password"
                    type="password"
                    text={loginForm.password}
                    name="password"
                    placeholder="Password"
                    value={loginForm.password} />
                <label className='label_error'>{error}</label>
                <button id="goToSignup" className="goToSignup" onClick={goToSignup}>¿No tienes cuenta? Registrarme</button>
                <button id="submitbtn1" onClick={logMeIn}>Submit</button>
            </form>
        </Fragment>
    );
}

export default Login;