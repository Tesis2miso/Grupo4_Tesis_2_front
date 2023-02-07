import logo from '../../logo.svg'
import axios from "axios";

function Home(props) {

    function logMeOut() {
        axios({
            method: "POST",
            url: "/specialist/logout",
        })
            .then((response) => {
                props.removeToken()
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
                <button onClick={logMeOut}>
                    Logout
                </button>
            </header>
        </div>
    )
}

export default Home;