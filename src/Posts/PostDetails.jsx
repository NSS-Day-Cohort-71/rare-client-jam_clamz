import { useEffect, useState } from "react"
import { getPostById } from "../managers/PostManager"
import { useNavigate, useParams } from "react-router-dom"
import "./Posts.css"
import { fetchCurrentUser } from "../managers/UserManager"
import { getPostTags } from "../managers/TagManager"
import TagPost from "../components/Tags/TagPost"

export const PostDetails = () => {

    const [post, setPost] = useState({})
    const {postId} = useParams()
    const navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState({});
    const [tags, setTags] = useState([]);
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
        getPostById(postId).then(data => {
            setPost(data)
        })
    }, [postId, triggerReRender])

    const isAuthor = currentUser.id === post.user_id

    useEffect(() => {
        getPostTags(postId).then(setTags); // Fetch tags associated with the post
      }, [postId]);

    return (
        <div className="details-container">
            <div className="details-title">{post.title}</div>
            <img src={post.image_url} alt={post.title} className="details-img"></img>
            <div className="details-content">{post.content}</div>
            <div className="details-date">Published on: {post.publication_date}</div>
            <div className="details-author">Written by: {post.first_name} {post.last_name}</div>
            <div>
                                    <h2>Tags for this Post</h2>
                                    <ul>
                                        {tags.map((tag) => (
                                        <li key={tag.id}>{tag.label}</li>
                                        ))}
                                    </ul>
                                    </div>
            <div>
                <button className="button is-primary" onClick={() => navigate(`/posts/comment/${postId}`)}>Add a Comment</button>
            </div>
            <TagPost setTriggerReRender={setTriggerReRender} triggerReRender={triggerReRender}/>
            {isAuthor && (
                <div>
                    <button className="button is-primary" onClick={() => navigate(`/posts/edit/${postId}`)}>Edit</button>
                    <button className="button is-secondary">Delete</button>
                </div>
            )}
            {isAuthor && (
            <div>
                <button className="button is-info" onClick={() => navigate(`/Comments/${postId}`)}>See Comments</button>
            </div>
            
            )}
        </div>
    )
}