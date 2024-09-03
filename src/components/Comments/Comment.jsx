import { useEffect, useState } from "react";
import { fetchCurrentUser } from "../../managers/UserManager";
import { useNavigate, useParams } from "react-router-dom";
import { saveComment } from "../../managers/CommentManager";

export const Comment = () => {

    const navigate = useNavigate()

    const [currentUser, setCurrentUser] = useState({})
    const [commentText, setCommentText] = useState("")
    const { postId } = useParams()

    useEffect(() => {
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

    const handleComment = () => {
        if (commentText === "") {
            alert("Cannot submit blank comment")
        }

        const comment = {
            post_id: parseInt(postId),
            author_id: currentUser.id,
            content: commentText,
            date: new Date().toISOString()
        }

        saveComment(comment).then(() => {
            navigate(`/Comments/${postId}`)
        })
    }

    return (
        <div className="comment-container">
            <div>
                <label>Add a comment:</label>
            </div>
            <textarea rows="10" cols="100" onChange={(e) => setCommentText(e.target.value)}></textarea>
            <div>
                <button className="button is-primary" onClick={handleComment}>Submit</button>
            </div>
            
        </div>
    )
}