import '../App.css';
import React, { useEffect, useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../firebase-config'
import { useNavigate } from 'react-router-dom'

function CreatePost(props) {

    const [title, setTitle] = useState("");
    const [postText, setPostText] = useState("");
    const [disBut, setDisBut] = useState(false);

    const aler = (tit, text) => {
        return (tit.length <= 3) || (text.length <= 10)
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
    }, [props.isAuth, navigate])

    return (
        <div className="createPostPage">
            <div className="cpContainer">
                <h1>Create A Post</h1>
                <div className="inputGp">
                    <label> Title:</label>
                    <input
                        placeholder="Title...(Min 3 chars)"
                        onChange={(event) => {
                            setTitle(event.target.value);
                        }}
                    />
                </div>
                <div className="inputGp">
                    <label> Post:</label>
                    <textarea
                        placeholder="Post...(Min 10 chars)"
                        onChange={(event) => {
                            setPostText(event.target.value);
                        }}
                    />
                </div>

                <button disabled={disBut || aler(title, postText)} onClick={() => {
                    setDisBut(true);
                    createPost();
                }}>Submit Post</button>
            </div>
        </div>
    );
}

export default CreatePost