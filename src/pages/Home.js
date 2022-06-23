import React, { useEffect, useState } from 'react'
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase-config'
import Preloader from '../components/Preloader'

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

    return <>  {loading ? <Preloader /> :
        <div className="homePage">{postLists.map((post) => {
            return (
                <div className="post">
                    <div className="postHeader">
                        <div className="title">
                            <h1>{post.title}</h1>
                        </div>
                        <div className="deletePost">
                            {props.isAuth && post.author.id === auth.currentUser.uid &&
                                <button onClick={() => {
                                    setLoading(true)
                                    setDelPost(post.id)
                                }}>&#128465;</button>
                            }

                        </div>
                    </div>
                    <div className="postTextContainer">{post.postText}</div>
                    <h3>@{post.author.name}</h3>
                </div>
            )
        })}
        </div>}
    </>
}

export default Home