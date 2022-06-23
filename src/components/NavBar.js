import { signOut } from 'firebase/auth'
import { auth } from '../firebase-config'
import { useNavigate, Link } from "react-router-dom";

function NavBar(props) {

    let navigate = useNavigate();

    const signUserOut = () => {
        signOut(auth).then((result) => {
            if (result !== null) {
                localStorage.clear()
                props.setIsAuth(false)
                navigate("/login");
            }
        })
    }

    return <nav>
        <Link to="/">Home</Link>
        {!props.isAuth ?
            (<Link to="/login">Login</Link>) : (
                <>
                    <Link to="/createpost">Create Post</Link>
                    <button className="logOutBut" onClick={signUserOut}>Log out</button>
                </>
            )}
    </nav>
}

export default NavBar