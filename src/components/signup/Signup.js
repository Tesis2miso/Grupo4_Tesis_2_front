import "./Signup.css";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, Fragment } from 'react';
import axios from "axios";

function Signup(props) {
    const navigate = useNavigate()
    const { loggedIn } = props
    useEffect(() => {
        if (loggedIn) {
            navigate('/')
        }
    })
    const [signupForm, setSignupForm] = useState({
        name: "",
        lastName: "",
        email: "",
        emailConfirmation: "",
        username: "",
        password: "",
        passwordConfirmation: "",
        checked: false
    })
    const [error, setError] = useState();

    const handleChange = (event) => {
        const { value, name } = event.target
        setSignupForm(prevNote => ({
            ...prevNote, [name]: value
        }))
    }

    const handleCheck = (event) => {
        const { checked } = event.target
        setSignupForm(prevNote => ({
            ...prevNote, checked: checked
        }))
    }

    document.addEventListener('DOMContentLoaded', () => {
        const miInput = document.getElementById('password');

        miInput.addEventListener('keyup', function (event) {
            if (event.getModifierState('CapsLock')) {
                alert("Bloq Mayús esta activado");
            }
        });
    });

    const signMeUp = (event) => {
        event.preventDefault()
        const {
            name, lastName,
            email, emailConfirmation,
            username, checked,
            password, passwordConfirmation
        } = signupForm

        if(email.trim() !== emailConfirmation.trim()) {
            setError('Emails does not match');
            return;
        }

        if (password.trim() !== passwordConfirmation.trim()) {
            setError('Passwords does not match');
            return;
        }

        if (!checked) {
            setError('You need to accepts terms and conditions');
            return;
        }

        axios({
            method: "POST",
            url: `${process.env.REACT_APP_BASE_PATH}/specialist`,
            data: {
                name: name,
                last_name: lastName,
                email: email,
                username: username,
                password: password,
            }
        })
            .then((response) => {
                props.setToken(response.data.token);
                navigate('/')
            }).catch((error) => {
                setError(error.response.data.mssg);
            })
    }

    const goToLogin = (event) => {
        event.preventDefault()
        navigate('/login')
    }

    return (
        <Fragment>
            <form className="signup">
                <h1 className="title">DermoApp</h1>
                <h2 className="subtitle">Registro de usuarios</h2>
                <br></br>
                <input
                    className="formField"
                    id="name"
                    onChange={handleChange}
                    type="text"
                    name="name"
                    placeholder="Name"
                    text={signupForm.name}
                    value={signupForm.name} />

                <input
                    className="formField"
                    id="lastName"
                    onChange={handleChange}
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    text={signupForm.lastName}
                    value={signupForm.lastName} />

                <input
                    className="formField"
                    id="email"
                    onChange={handleChange}
                    type="email"
                    name="email"
                    placeholder="Email"
                    text={signupForm.email}
                    value={signupForm.email} />

                <input
                    className="formField"
                    id="emailConfirmation"
                    onChange={handleChange}
                    type="email"
                    name="emailConfirmation"
                    placeholder="Email confirmation"
                    text={signupForm.emailConfirmation}
                    value={signupForm.emailConfirmation} />

                <input
                    className="formField"
                    id="username"
                    onChange={handleChange}
                    type="text"
                    name="username"
                    placeholder="Username"
                    text={signupForm.username}
                    value={signupForm.username} />

                <input
                    className="formField"
                    id="password"
                    onChange={handleChange}
                    type="password"
                    name="password"
                    placeholder="Password"
                    text={signupForm.password}
                    value={signupForm.password} />

                <input
                    className="formField"
                    id="passwordConfirmation"
                    onChange={handleChange}
                    type="password"
                    name="passwordConfirmation"
                    placeholder="Password confirmation"
                    text={signupForm.passwordConfirmation}
                    value={signupForm.passwordConfirmation} />

                <div className="form-check">
                    <input
                        onChange={handleCheck}
                        id="termsAndConditions"
                        type="checkbox"
                        className="checkTermsAndConditions"
                        checked={signupForm.checked}
                    />
                    <label className="conditionsLabel" htmlFor="termsAndConditions">
                        Do you accept terms and conditions?
                    </label>
                </div>

                <label className='label_error' id="error">{error}</label>
                <button id="goToLogin" className="goToLogin" onClick={goToLogin}>¿Ya tienes cuenta? Iniciar sesión</button>
                <button id="submitbtn1" className="submitButton" onClick={signMeUp}>Registrarse</button>
            </form>
        </Fragment>
    );
}

export default Signup;
