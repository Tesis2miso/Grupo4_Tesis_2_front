import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Suspense } from 'react'
import Login from './components/login/Login'
import Signup from './components/signup/Signup'
import Home from './components/home/Home'
import useToken from './components/utils/useToken'
import './App.css'
import ProtectedRoute from './components/utils/ProtectedRoute'
import Loading from './components/utils/Loading'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  const { token, removeToken, setToken } = useToken();
  const loggedIn = () => {
    return !(!token && token !== "" && token !== undefined)
  }

  return (
    <div className="App">
      <Suspense fallback={<Loading />}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/signup" element={<Signup loggedIn={loggedIn()} setToken={setToken} />}></Route>
            <Route path="/login" element={<Login loggedIn={loggedIn()} setToken={setToken} />}></Route>
            <Route
              path="/*"
              element={
                <ProtectedRoute loggedIn={loggedIn()}><Home removeToken={removeToken} /></ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </Suspense>
      <ToastContainer />
    </div>
  );
}

export default App;