import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/login/Login'
import Home from './components/login/Home'
import Header from './components/login/Header'
import useToken from './components/login/useToken'
import './App.css'

function App() {
  const { token, removeToken, setToken } = useToken();

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home token={token} setToken={setToken} removeToken={removeToken} />}></Route>
        <Route exact path="/login" element={<Login setToken={setToken} />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;