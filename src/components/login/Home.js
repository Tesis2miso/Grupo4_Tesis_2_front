import logo from '../../logo.svg'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from './Header'
import { useEffect } from 'react';

function Home(props) {
    const navigate = useNavigate();
    const { token, removeToken } = props;

    useEffect(() => {
        if (!token) {
            navigate("/login");
            console.log("asfasf")
        } else {
            console.log("Entre");
        }
    }, []);

    function logMeOut() {
        //axios({
        //    method: "POST",
        //    url: "/specialist/logout",
        //})
        //    .then((response) => {
        //        props.token()
        //    }).catch((error) => {
        //        if (error.response) {
        //            console.log(error.response)
        //            console.log(error.response.status)
        //            console.log(error.response.headers)
        //        }
        //    })
        props.token()
    }

    return (
        <div>
            <Header token={removeToken} />
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <button onClick={logMeOut}>
                    Logout
                </button>
            </header>
        </div>
    )
}

export default Home;