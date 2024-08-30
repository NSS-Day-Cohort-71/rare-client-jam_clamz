import { useEffect } from "react"
import { useState } from "react"
import { getAllPosts } from "../managers/PostManager"
import "./Posts.css"
import { Link, useNavigate } from "react-router-dom"
import { fetchCurrentUser } from "../managers/UserManager"

export const Posts = () => {
    const [allPosts, setAllPosts] = useState([])
    const navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState({});

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
    }, [setAllPosts])

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
                    <button className="button is-primary" onClick={() => navigate(`/posts/edit/${post.id}`)}>Edit</button>
                    <button className="button is-secondary">Delete</button>
                </div>
            )}
                        </div>
                    
                )
            })}
        </div>
    )

}