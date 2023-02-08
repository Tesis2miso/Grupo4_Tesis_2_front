import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/login/Login'
import Signup from './components/signup/Signup'
import Home from './components/home/Home'
import useToken from './components/utils/useToken'
import './App.css'
import ProtectedRoute from './components/utils/ProtectedRoute'

function App() {
  const { token, removeToken, setToken } = useToken();
  const loggedIn = () => {
    return !(!token && token !== "" && token !== undefined)
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/signup" element={<Signup loggedIn={loggedIn()} setToken={setToken} />}></Route>
          <Route path="/login" element={<Login loggedIn={loggedIn()} setToken={setToken} />}></Route>
          <Route
            exact path="/"
            element={
              <ProtectedRoute loggedIn={loggedIn()}><Home removeToken={removeToken} /></ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;