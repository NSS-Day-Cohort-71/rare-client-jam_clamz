import { useEffect, useState } from "react";
import "./MyPosts.css";
import { deletePost, getPostsByUserId } from "../../managers/PostManager";
import { useNavigate } from "react-router-dom";


export const MyPosts = () => {
    const [posts, setPosts] = useState([]);
    const userId = parseInt(localStorage.getItem('auth_token'));
    const navigate = useNavigate();
    const [triggerReRender, setTriggerReRender] = useState(false)
    // const [confirmDelete, setConfirmDelete] = useState(null)
    const [postToDelete, setPostToDelete] = useState(null)


    useEffect(() => {
        getPostsByUserId(userId).then(data => {
            setPosts(data);
        });
    }, [userId, triggerReRender]);

    const handleDelete = (e) => {
        e.preventDefault()
        const postToBeDeleted = parseInt(e.target.id)
        deletePost(postToBeDeleted).then(() => {
            setTriggerReRender(!triggerReRender)
        })
    }

    const confirmDelete = (postId) => {
        setPostToDelete(postId)
    }
 

    return (
        <div className="my-posts container">
            <h2 className="title">My Posts</h2>
            <div className="columns is-multiline">
                {posts.map(post => (
                    <div className="column is-one-third" key={post.id}>
                        <div className="card">
                            <div className="card-content">
                                <p className="title">{post.title}</p>
                                <p className="subtitle">{post.first_name} {post.last_name}</p>
                                <p>{post.label}</p>
                                </div>
                            <footer className="card-footer">
                                {postToDelete === post.id ? (
                                    <>
                                        <button type="button is-danger card-footer-item" onClick={handleDelete} id={post.id}>Confirm</button>
                                        <button type="button is-primary card-footer-item"  onClick={() => confirmDelete(null)}>Cancel</button>
                                    </>
                                    ) : (
                                        <>
                                            <button className="button is-link card-footer-item" onClick={() => navigate(`/posts/edit/${post.id}`)}>Edit</button>
                                            <button className="button is-danger card-footer-item" onClick={() => confirmDelete(post.id)}>Delete</button>
                                            <button className="button is-primary card-footer-item">Publish</button>
                                            <button className="button is-warning card-footer-item">Unpublish</button>
                                        </>
                                    )}
                                
                            </footer>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
