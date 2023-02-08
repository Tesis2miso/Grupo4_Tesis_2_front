import logo from '../../logo.svg'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Home(props) {
    const navigate = useNavigate()

    // eslint-disable-next-line no-unused-vars
    const [userName] = useState(() => {
        const un = localStorage.getItem("userName") || "";
        return un;
    });

    function logMeOut() {
        axios({
            method: "POST",
            url: `${process.env.REACT_APP_BASE_PATH}/specialist/logout`,
        }).then((response) => {
            props.removeToken()
            localStorage.removeItem("userName")
            navigate('/login')
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <div>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1>Hola {userName}, Bienvenido a DermoApp!</h1>
                <button id="btnLogout" onClick={logMeOut}>
                    Logout
                </button>
            </header>
        </div>
    )
}

export default Home;