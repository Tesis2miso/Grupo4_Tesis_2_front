import logo from '../../logo.svg'
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Header(props) {
  const navigate = useNavigate();

  function logMeOut() {
    //axios({
    //  method: "POST",
    //  url:"/specialist/logout",
    //})
    //.then((response) => {
    //   props.token()
    //}).catch((error) => {
    //  if (error.response) {
    //    console.log(error.response)
    //    console.log(error.response.status)
    //    console.log(error.response.headers)
    //    }
    //})
    props.token()
    navigate("/login");
  }

    return(
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <button onClick={logMeOut}> 
                Logout
            </button>
        </header>
    )
}

export default Header;