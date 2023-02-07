import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/login/Login'
import Home from './components/login/Home'
import useToken from './components/login/useToken'
import './App.css'

function App() {
  const { token, removeToken, setToken } = useToken();

  return (
    <BrowserRouter>
      <div className="App">
        {!token && token !== "" && token !== undefined ? <Login setToken={setToken} />
          : (
            <Routes>
              <Route exact path="/" element={<Home token={token} removeToken={removeToken} />}></Route>
            </Routes>
          )}
      </div>
    </BrowserRouter>
  );
}

export default App;