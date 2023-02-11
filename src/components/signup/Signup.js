import "./Signup.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState, Fragment } from "react";
import axios from "axios";
import LocaleContext from '../utils/LocaleContext'
import i18n from '../utils/i18n'
import DdlLanguage from '../utils/DdlLanguage'

function Signup(props) {
  const navigate = useNavigate();
  const { loggedIn } = props;
  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  });
  const [signupForm, setSignupForm] = useState({
    name: "",
    lastName: "",
    email: "",
    emailConfirmation: "",
    username: "",
    password: "",
    passwordConfirmation: "",
    checked: false,
  });
  const [error, setError] = useState();
  const [locale, setLocale] = useState(i18n.language);
  i18n.on('languageChanged', (lng) => setLocale(i18n.language));

  const handleChange = (event) => {
    const { value, name } = event.target;
    setSignupForm((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  const handleCheck = (event) => {
    const { checked } = event.target;
    setSignupForm((prevNote) => ({
      ...prevNote,
      checked: checked,
    }));
  };

  document.addEventListener("DOMContentLoaded", () => {
    const miInput = document.getElementById("password");

    miInput.addEventListener("keyup", function (event) {
      if (event.getModifierState("CapsLock")) {
        setError("Bloq Mayús esta activado");
      } else {
        setError(null);
      }
    });
  });

  const signMeUp = (event) => {
    event.preventDefault();
    const {
      name,
      lastName,
      email,
      emailConfirmation,
      username,
      checked,
      password,
      passwordConfirmation,
    } = signupForm;

    if (email.trim() !== emailConfirmation.trim()) {
      setError("Emails does not match");
      return;
    }

    if (password.trim() !== passwordConfirmation.trim()) {
      setError("Passwords does not match");
      return;
    }

    if (!checked) {
      setError("You need to accepts terms and conditions");
      return;
    }
    console.log(process.env.REACT_APP_BASE_PATH);
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_BASE_PATH}/specialist`,
      data: {
        name: name,
        last_name: lastName,
        email: email,
        username: username,
        password: password,
      },
    })
      .then((response) => {
        props.setToken(response.data.token);
        navigate("/");
      })
      .catch((error) => {
        console.log("error es" + error)
        //setError(error.response.data.mssg);
      });
  };

  const goToLogin = (event) => {
    event.preventDefault();
    navigate("/login");
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <div className='ddlLanguage'><DdlLanguage /></div>
      <Fragment>
        <div className="signUpApp">
          <form className="signup">
            <div id="shadowSignup">
              <br />
              <div className="container">
                <div className="row">
                  <div className="col-8">
                    <h1 style={{ float: "right" }}>DermoApp</h1>
                  </div>
                  <div className="col-1">
                    <img style={{ width: "35px" }} src={"./medical_logo.png"} />
                  </div>
                  <div className="col-3"></div>
                </div>
              </div>
              <h6 className="subtitle">Registro de usuarios</h6>
              <input
                className="formField"
                id="name"
                onChange={handleChange}
                type="text"
                name="name"
                placeholder="Name"
                text={signupForm.name}
                value={signupForm.name}
              />
              <br />
              <input
                className="formField"
                id="lastName"
                onChange={handleChange}
                type="text"
                name="lastName"
                placeholder="Last name"
                text={signupForm.lastName}
                value={signupForm.lastName}
              />

              <br />
              <input
                className="formField"
                id="email"
                onChange={handleChange}
                type="email"
                name="email"
                placeholder="Email"
                text={signupForm.email}
                value={signupForm.email}
              />

              <br />
              <input
                className="formField"
                id="emailConfirmation"
                onChange={handleChange}
                type="email"
                name="emailConfirmation"
                placeholder="Email confirmation"
                text={signupForm.emailConfirmation}
                value={signupForm.emailConfirmation}
              />

              <br />
              <input
                className="formField"
                id="username"
                onChange={handleChange}
                type="text"
                name="username"
                placeholder="Username"
                text={signupForm.username}
                value={signupForm.username}
              />

              <br />
              <input
                className="formField"
                id="password"
                onChange={handleChange}
                type="password"
                name="password"
                placeholder="Password"
                text={signupForm.password}
                value={signupForm.password}
              />

              <br />
              <input
                className="formField"
                id="passwordConfirmation"
                onChange={handleChange}
                type="password"
                name="passwordConfirmation"
                placeholder="Password confirmation"
                text={signupForm.passwordConfirmation}
                value={signupForm.passwordConfirmation}
              />

              <br />
              <div className="form-check">
                <input
                  onChange={handleCheck}
                  id="termsAndConditions"
                  type="checkbox"
                  className="checkTermsAndConditions"
                  checked={signupForm.checked}
                />
                <label className="conditionsLabel" htmlFor="termsAndConditions">
                  Acepta los terminos y condiciones?
                </label>
              </div>
              <label className="label_error" id="error">
                {error}
              </label>
              <button id="goToLogin" className="goToLogin" onClick={goToLogin}>
                ¿Ya tienes cuenta? Iniciar sesión
              </button>

              <button
                type="button"
                style={{ width: "70%" }}
                className="btn btn-success"
                id="submitbtn1"
                onClick={signMeUp}
              >
                Registrarse
              </button>
            </div>
          </form>
        </div>
      </Fragment>
    </LocaleContext.Provider>
  );
}

export default Signup;
