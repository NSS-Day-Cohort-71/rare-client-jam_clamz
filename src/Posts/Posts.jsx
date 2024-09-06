import { useEffect } from "react"
import { useState } from "react"
import { deletePost, getAllPosts } from "../managers/PostManager"
import "./Posts.css"
import { Link, useNavigate } from "react-router-dom"
import { fetchCurrentUser } from "../managers/UserManager"

export const Posts = () => {
    const [allPosts, setAllPosts] = useState([])
    const navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState({});
    const [postToDelete, setPostToDelete] = useState(null)
    const [triggerReRender, setTriggerReRender] = useState(false)

    useEffect(() => {
        // fetch current user data
        const getCurrentUser = async () => {
            const userId = localStorage.getItem('auth_token');
            if (userId) {
                const userData = await fetchCurrentUser(userId);
                if (userData.found) {
                    setCurrentUser(userData.user);
                } else {
                    console.error('User not found');
                }
            } else {
                console.error('No user ID found in local storage');
            }
        };

        getCurrentUser();
    }, []);


    useEffect(() => {
        getAllPosts().then(data => {
            setAllPosts(data)
        })
    }, [setAllPosts, triggerReRender])

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
        <div className="post-list">
            {allPosts.map(post => {
                const isAuthor = currentUser.id === post.user_id
                return (
                        <div className="post-container">
                            <Link to={`/Posts/${post.id}`} className="post-link">
                            <h2 className="post-title">{post.title}</h2>
                            </Link>
                            <div className="post-author">{post.first_name} {post.last_name}</div>
                            <div className="post-category">{post.label}</div>
                            {isAuthor && (
                <div>
                    {postToDelete === post.id ? (
                                    <>
                                        <button type="button is-danger card-footer-item" onClick={handleDelete} id={post.id}>Confirm</button>
                                        <button type="button is-primary card-footer-item"  onClick={() => confirmDelete(null)}>Cancel</button>
                                    </>
                                    ) : (
                                        <>
                                            <button className="button is-link card-footer-item" onClick={() => navigate(`/posts/edit/${post.id}`)}>Edit</button>
                                            <button className="button is-danger card-footer-item" onClick={() => confirmDelete(post.id)}>Delete</button>
                                            {/* <button className="button is-primary card-footer-item">Publish</button>
                                            <button className="button is-warning card-footer-item">Unpublish</button> */}
                                        </>
                                    )}
                </div>
            )}
                        </div>
                    
                )
            })}
        </div>
    )

}
