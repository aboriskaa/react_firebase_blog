import React, { useEffect } from 'react'
import { auth, provider } from '../firebase-config'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

function Login(props) {

    let navigate = useNavigate();

    useEffect(() => {
        if (props.isAuth) navigate("/")
    }, [props.isAuth, navigate])

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then(() => {
            localStorage.setItem("isAuth", true)
            localStorage.setItem("dispalyName", auth.currentUser.displayName)
            localStorage.setItem("photoURL", auth.currentUser.photoURL)
            props.setIsAuth(true);
            navigate("/");
        })
    }

    return <div className="loginPage">
        <p>Sign In With Google to Continue</p>
        <button onClick={signInWithGoogle} className="login-with-google-btn">Sign in with Google</button>
    </div>
}

export default Login