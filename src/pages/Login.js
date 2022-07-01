import React, { useEffect } from 'react'
import { auth, provider } from '../firebase-config'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { Grid, Container, Typography, Box } from '@mui/material';
import styles from './Login.module.css'

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

    return (
        <>
            <Container fixed>
                <Grid container spacing={2} mt='20px' sx={{}}>
                    <Grid item xs={12} md={12} sx={{}}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center'
                            }}
                        >
                            <Typography>For security purposes, I only use sign In With Google</Typography>

                        </Box>
                        <Box mt="5px"
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'center'
                            }}
                        >
                            <Box> <button onClick={signInWithGoogle} className={styles.loginWithGoogleBtn}>Sign in with Google</button></Box>
                        </Box>

                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default Login