import { useState, Fragment } from "react";
import axios from "axios";
import "./Login.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LocaleContext from '../utils/LocaleContext'
import i18n from '../utils/i18n'
import DdlLanguage from '../utils/DdlLanguage'

function Login(props) {
  const [loginForm, setloginForm] = useState({
    email: "",
    password: "",
  });
  const [errorCred, setErrorCred] = useState();
  const [errorCaps, setErrorCaps] = useState();
  const navigate = useNavigate();
  const { loggedIn } = props;
  const { t } = useTranslation();

  // useEffect(() => {
  //   if (loggedIn) {
  //     navigate("/agenda");
  //   } else {
  //     navigate("/login")
  //   }
  // });

  const [locale, setLocale] = useState(i18n.language);
  i18n.on('languageChanged', (lng) => setLocale(i18n.language));


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
        localStorage.setItem("userName", response.data.username.username)
        localStorage.setItem("id", response.data.username.id)
        navigate('/')
      })
      .catch((error) => {
        setloginForm({
          email: "",
          password: "",
        });
        setErrorCred("Invalid Username or Password");
      });
  }

  function CapsLockOn(event) {
    const caps = event.getModifierState && event.getModifierState("CapsLock");
    if (caps) {
      setErrorCaps("¿Está el bloqueo de mayúsculas activado?");
    } else {
      setErrorCaps("");
    }
  }

  function handleChange(event) {
    const { value, name } = event.target;
    setloginForm((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  }

  const goToSignup = (event) => {
    event.preventDefault();
    navigate("/signup");
  };

  document.addEventListener("mouseenter", CapsLockOn);
  document.addEventListener("keydown", CapsLockOn);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <div className='ddlLanguage'><DdlLanguage /></div>
      <Fragment>
        <div className="loginApp">
          <form className="login">
            <div id="shadow">
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

              <br></br>
              <div className="login-form">
                <input
                  id="username"
                  onChange={handleChange}
                  type="email"
                  text={loginForm.email}
                  name="email"
                  className="form-control"
                  placeholder={t("email")}
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
                placeholder={t("password")}
                style={{ width: "90%", display: "grid" }}
                value={loginForm.password}
              />
            </div>
            <div>
              {errorCaps && (
                <label className="label_error">{t("errorBMayus")}</label>
              )}
              {errorCred && (
                <label className="label_error">{t("errorCredentials")}</label>
              )}
            </div>
            <button id="goToSignup" className="goToSignup" onClick={goToSignup}>
              {t("signin")}
            </button>
            <br />
            <button
              type="button"
              style={{ width: "70%" }}
              className="btn btn-success"
              id="submitbtn1"
              onClick={logMeIn}
            >
              {t("submit")}
            </button>
            <br />
            <a href="#">{t("forgotpwd")}</a>
          </div>
        </form>
      </div>
    </Fragment>
    </LocaleContext.Provider>
  );
}

export default Login;