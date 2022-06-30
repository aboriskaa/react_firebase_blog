import React, { useEffect, useState } from 'react'
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase-config'
import Preloader from '../components/Preloader'
import DeleteIcon from '@mui/icons-material/Delete';
import { Grid, Container, Card, CardActions, Box, CardContent, Button, AccordionSummary, Accordion, Typography, CardMedia } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


function Home(props) {

    const [postLists, setPostList] = useState([]);
    const [delPost, setDelPost] = useState("");
    const [loading, setLoading] = useState(true);



    useEffect(() => {

        async function getPosts(db) {
            try {
                const postsCollectionRef = collection(db, "posts");
                const data = await getDocs(postsCollectionRef);
                const postListdata = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

                postListdata.sort((a, b) => {
                    return b.date.seconds - a.date.seconds;
                });

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
                <Grid container spacing={2} mt='20px'>

                    {postLists.map((post) => {
                        return (
                            <Grid item xs={12} sm={6} md={4} key={post.id}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Card sx={{ maxWidth: 375 }} >
                                        <Typography variant="caption" display="block" gutterBottom>
                                            @{post.author.name}
                                        </Typography>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image="https://picsum.photos/200/300?random=1"
                                            alt="green iguana"
                                        />
                                        <CardContent>
                                            <Accordion>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                >
                                                    <Typography gutterBottom variant="h5" component="div">{post.title}</Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {post.postText}
                                                    </Typography>
                                                </AccordionDetails>
                                            </Accordion>

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