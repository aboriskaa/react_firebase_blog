import React, { useEffect, useState } from 'react'
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase-config'
import Preloader from '../components/Preloader'
import DeleteIcon from '@mui/icons-material/Delete';
import { Grid, Container, Card, CardActions, Box, CardContent, Button, Typography, CardMedia } from '@mui/material';

function Home(props) {

    const [postLists, setPostList] = useState([]);
    const [delPost, setDelPost] = useState("");
    const [loading, setLoading] = useState(true);

    function RandomPicUrl(int) {
        let num = Math.floor(Math.random() * int);
        let url = "https://picsum.photos/375/200?random=" + num
        return url
    }

    useEffect(() => {

        async function getPosts(db) {
            try {
                const postsCollectionRef = collection(db, "posts");
                const data = await getDocs(postsCollectionRef);
                const postListdata = data.docs.map((doc) => ({ ...doc.data(), id: doc.id, picURL: RandomPicUrl(99) }));

                postListdata.sort((a, b) => {
                    return b.date.seconds - a.date.seconds;
                });
                // console.log(postListdata)
                return postListdata;
            }
            catch (error) {
                alert(error)
            }
        }
        getPosts(db).then(result => {
            setPostList(result);
            setLoading(false);
        })
    }, [delPost])


    const deletePost = async (id) => {
        try {
            const postDoc = doc(db, "posts", id)
            await deleteDoc(postDoc)
            setDelPost("");
            setLoading(false);
        }
        catch (error) {
            alert(error)
        }
    }

    if (delPost !== "") {
        deletePost(delPost);
    }

    return <>{loading ? <Preloader /> :
        <Container>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} mb='20px' mt='20px'>

                    {postLists.map((post) => {
                        return (
                            <Grid item xs={12} sm={6} md={4} key={post.id}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Card sx={{ minWidth: 375, maxWidth: 375 }} >
                                        <Typography variant="caption" display="block" gutterBottom>
                                            @{post.author.name}
                                        </Typography>
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image={post.picURL}
                                            alt="Random pic"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">{post.title}</Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {post.postText}
                                            </Typography>


                                        </CardContent>
                                        <CardActions>

                                            {props.isAuth && post.author.id === auth.currentUser.uid &&
                                                <Button
                                                    onClick={() => {
                                                        setLoading(true)
                                                        setDelPost(post.id)
                                                    }}
                                                    variant="outlined"
                                                    startIcon={<DeleteIcon />
                                                    }>
                                                    Delete
                                                </Button>
                                            }

                                        </CardActions>
                                    </Card>
                                </Box>
                            </Grid>
                        )
                    })}

                </Grid>
            </Box>
        </Container>
    }
    </>
}

export default Home