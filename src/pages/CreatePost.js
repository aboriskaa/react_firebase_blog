import React, { useEffect, useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../firebase-config'
import { useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function CreatePost(props) {

    const [title, setTitle] = useState("");
    const [postText, setPostText] = useState("");
    const [disBut, setDisBut] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            title: data.get('title'),
            postText: data.get('postText'),
        });
        setTitle(data.get('title'));
        setPostText(data.get('postText'));
        setDisBut(true);
        createPost();
    }

    const aler = (tit, text) => {
        return (tit.length < 3) || (text.length < 10)
    }

    let navigate = useNavigate();

    const postsCollectionRef = collection(db, "posts");


    const createPost = async () => {
        await addDoc(postsCollectionRef, {

            title, postText,
            author: {
                name: auth.currentUser.displayName,
                id: auth.currentUser.uid,
            },
            date: new Date()
        })
        setDisBut(false);
        navigate("/");
    }

    useEffect(() => {
        if (!props.isAuth) {
            navigate("/login");
        }
    }, [props.isAuth, navigate]);


    return (
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: `center`
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <SendIcon />
                    </Avatar>
                    <Typography sx={{ textAlign: 'center' }} component="h1" variant="h5">
                        It would be great if the article was intelligible))
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="title"
                            label="Your Title (min 3 chars)"
                            name="title"
                            autoComplete="text"
                            autoFocus
                            onChange={(event) => {
                                setTitle(event.target.value);
                            }}

                        />
                        <TextField
                            id="filled-multiline"
                            name="postText"
                            label="Your Article (min 10 chars)"
                            multiline
                            required
                            fullWidth
                            rows={4}
                            onChange={(event) => {
                                setPostText(event.target.value);
                            }}

                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={disBut || aler(title, postText)}
                        >
                            Post It
                        </Button>
                    </Box>
                </Box>
            </Container>
        </>
    );
}

export default CreatePost