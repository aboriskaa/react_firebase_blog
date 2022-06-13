import './App.css';
import { Routes, Route, Link } from 'react-router-dom'
import { auth } from './firebase-config'
import { useState } from 'react';
import { signOut } from 'firebase/auth'
import Home from './pages/Home'
import Login from './pages/Login'
import CreatePost from './pages/CreatePost'
import { useNavigate } from "react-router-dom";


function App() {

  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  let navigate = useNavigate();

  const signUserOut = () => {
    signOut(auth).then((result) => {
      if (result !== null) {
        localStorage.clear()
        setIsAuth(false)
        navigate("/login");
      }
      // window.location.pathname = "/login"
    })
  }

  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        {!isAuth ?
          (<Link to="/login">Login</Link>) : (
            <>
              <Link to="/createpost">Create Post</Link>
              {/* <i onClick={signUserOut} className="fa-solid fa-person-walking-dashed-line-arrow-right"> EXIT</i> */}
              <button className="logOutBut" onClick={signUserOut}>Log out</button>
            </>
          )}
      </nav>
      <Routes>
        <Route path="*" element={<Home isAuth={isAuth} />} />
        <Route path="/" element={<Home isAuth={isAuth} />} />
        <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
      </Routes>
    </>
  );
}

export default App;
