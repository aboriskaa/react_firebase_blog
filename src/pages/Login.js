import React from 'react'
import { auth, provider } from '../firebase-config'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

function Login(props) {

    let navigate = useNavigate();

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then(() => {
            localStorage.setItem("isAuth", true)
            props.setIsAuth(true);
            navigate("/");
        })
    }
    return (
        <div className="loginPage">
            <p>Sign In With Google to Continue</p>
            <button onClick={signInWithGoogle} className="login-with-google-btn">Sign in with Google</button>
        </div>
    )
}

export default Login