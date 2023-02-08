import { useState, Fragment } from 'react';
import axios from "axios";
import './Login.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

function Login(props) {
    const [loginForm, setloginForm] = useState({
        email: "",
        password: ""
    })
    const [errorCred, setErrorCred] = useState();
    const [errorCaps, setErrorCaps] = useState();
    const [isCapsLockOn, setIsCapsLockOn] = useState(false);
    const navigate = useNavigate()
    const { loggedIn } = props
    const { t } = useTranslation();
    useEffect(() => {
        if (loggedIn) {
            navigate('/')
        }
    })

    const checkCapsLock = (event) => {
        if (event.getModifierState('CapsLock')) {
            setIsCapsLockOn(true);
        } else {
            setIsCapsLockOn(false);
        }
    };

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
                localStorage.setItem("userName", response.data.username.username)
                navigate('/')
            }).catch((error) => {
                setloginForm(({
                    email: "",
                    password: ""
                }))
                setErrorCred('Invalid Username or Password')
            })
    }

    function handleChange(event) {
        const { value, name } = event.target
        setloginForm(prevNote => ({
            ...prevNote, [name]: value
        })
        )
    }

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
                    placeholder={t("email")}
                    value={loginForm.email} />
                <input id="password" onChange={handleChange}
                    data-testid="password"
                    type="password"
                    text={loginForm.password}
                    name="password"
                    placeholder={t("password")}
                    value={loginForm.password} />
                <div><label className='label_error'>{errorCred}</label></div>
                {isCapsLockOn && (
                    <p className='label_error'>{t('errorBMayus')}</p>
                )}                
                <button id="goToSignup" className="goToSignup" onClick={goToSignup}>{t('signin')}</button>
                <button id="submitbtn1" onClick={logMeIn}>{t('submit')}</button>
                <a href='#'>{t("forgotpwd")}</a>
            </form>
        </Fragment>
    );
}

export default Login;