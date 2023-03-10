import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Agenda from "./components/agenda/Agenda";
import Home from "./components/home/Home";
import useToken from "./components/utils/useToken";
import "./App.css";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import i18n from "./components/utils/i18n";
import Loading from "./components/utils/Loading";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import LocaleContext from "./components/utils/LocaleContext";
import { useState } from "react";

function App() {
  const [locale, setLocale] = useState(i18n.language);
  i18n.on("languageChanged", (lng) => setLocale(i18n.language));

  const { token, removeToken, setToken } = useToken();
  const loggedIn = () => {
    return !(!token && token !== "" && token !== undefined);
  };

  return (
    <div className="App">
      <LocaleContext.Provider value={{ locale, setLocale }}>
        <Suspense fallback={<Loading />}>
    
          <BrowserRouter>
            <Routes>
              <Route
                exact
                path="/signup"
                element={<Signup loggedIn={loggedIn()} setToken={setToken} />}
              ></Route>
              <Route
                path="/login"
                element={<Login loggedIn={loggedIn()} setToken={setToken} />}
              ></Route>
              <Route
                exact
                path="/*"
                element={
                  <ProtectedRoute loggedIn={loggedIn()}>
                    <Home removeToken={removeToken} />
                  </ProtectedRoute>
                }
              />
             
            </Routes>
          </BrowserRouter>
        </Suspense>
        <ToastContainer />
      </LocaleContext.Provider>

    </div>
  );
}

export default App;
