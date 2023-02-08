import logo from '../../logo.svg'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Home(props) {
    const navigate = useNavigate()

    function logMeOut() {
        axios({
            method: "POST",
            url: `${process.env.REACT_APP_BASE_PATH}/specialist/logout`,
        }).then((response) => {
            props.removeToken()
            navigate('/login')
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
                <h1>Bienvenido a DermoApp!</h1>
                <button id="btnLogout" onClick={logMeOut}>
                    Logout
                </button>
            </header>
        </div>
    )
}

export default Home;