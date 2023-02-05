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
      <div className="App">
      <Header token={removeToken}/>
        {!token && token!=="" &&token!== undefined?  
        <Login setToken={setToken} />
        :(
          <>
            <Routes>
              <Route exact path="/specialist/home" element={<Home token={token} setToken={setToken}/>}></Route>
            </Routes>
          </>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;