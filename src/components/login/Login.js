import { useState, Fragment } from "react";
import axios from "axios";
import "./Login.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const [loginForm, setloginForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState();
  const navigate = useNavigate();
  const { loggedIn } = props;
  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  });

  function logMeIn(event) {
    event.preventDefault();
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_BASE_PATH}/specialist/login`,
      data: {
        email: loginForm.email,
        password: loginForm.password,
      },
    })
      .then((response) => {
        props.setToken(response.data.access_token);
        navigate("/");
      })
      .catch((error) => {
        setloginForm({
          email: "",
          password: "",
        });
        setError("Invalid Username or Password");
      });
  }

  function handleChange(event) {
    const { value, name } = event.target;
    setloginForm((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  }

  document.addEventListener("DOMContentLoaded", () => {
    const miInput = document.getElementById("password");

    miInput.addEventListener("keyup", function (event) {
      if (event.getModifierState("CapsLock")) {
        setError("Bloq Mayús esta activado");
      }
    });
  });

  const goToSignup = (event) => {
    event.preventDefault();
    navigate("/signup");
  };

  return (
    <Fragment>
      <div>
        <form className="login">
          <div id="shadow">
            <br/>
            <div class="container">
              <div class="row">
                <div class="col-8">
                  <h1 style={{float:"right"}}>DermoApp</h1>
                </div>
                <div class="col-1">
                  <img style={{ width: "35px" }} src={"./medical_logo.png"} />
                </div>
                <div class="col-3"></div>
              </div>
            </div>

            <br></br>
            <div className="login-form">
              <input
                id="username"
                onChange={handleChange}
                type="email"
                text={loginForm.email}
                name="email"
                className="form-control"
                placeholder="Email"
                value={loginForm.email}
                style={{ width: "90%", display: "grid" }}
              />
              <br />

              <input
                id="password"
                onChange={handleChange}
                data-testid="password"
                className="form-control"
                type="password"
                text={loginForm.password}
                name="password"
                placeholder="Password"
                style={{ width: "90%", display: "grid" }}
                value={loginForm.password}
              />
            </div>

            <label className="label_error">{error}</label>
            <button id="goToSignup" className="goToSignup" onClick={goToSignup}>
              ¿No tienes cuenta? Registrarme
            </button>
            <br />
            <button
              type="button"
              style={{ width: "70%" }}
              class="btn btn-success"
              id="submitbtn1"
              onClick={logMeIn}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
}

export default Login;
