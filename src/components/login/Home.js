import logo from '../../logo.svg'
import axios from "axios";
import { useState } from 'react';


function Home(props) {

    // eslint-disable-next-line no-unused-vars
    const [userName, setUserName] = useState(() => {
        return localStorage.getItem("userName").split('@').at(0) || "";
    });

    function logMeOut() {
        axios({
            method: "POST",
            url: "/specialist/logout",
        })
            .then((response) => {
                props.removeToken()
                localStorage.removeItem("userName")
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                }
            })
    }

    return (
        <div>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1>Hola {userName}, Bienvenido a DermoApp!</h1>
                <button onClick={logMeOut}>
                    Logout
                </button>
            </header>
        </div>
    )
}

export default Home;