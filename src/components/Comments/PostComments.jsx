import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { deleteComment, getCommentsByPostId } from "../../managers/CommentManager"
import { getPostById } from "../../managers/PostManager"
import { fetchCurrentUser } from "../../managers/UserManager"

export const PostComments = ({token}) => {
    const [comments, setComments] = useState([])
    const [post, setPost] = useState({})
    const [currentUser, setCurrentUser] = useState({})
    const [commentToDelete, setCommentToDelete] = useState(null)
    const { postId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getCommentsByPostId(postId).then(data => {
            setComments(data)
        })

        getPostById(postId).then(data => {
            setPost(data)
        })

        const getCurrentUser = async () => {
            const userData = await fetchCurrentUser(token)
            setCurrentUser(userData)
        }

        getCurrentUser()
    }, [postId, token])

    const handleDelete = async (commentId) => {
        await deleteComment(commentId)
        setCommentToDelete(null)
        getCommentsByPostId(postId).then(data => {
            setComments(data)
        })
    }

    return  (
        <div className="container">
            <h1 className="title">Comments for: {post.title}</h1>
            {comments.map(comment => (
                <div key={comment.id} className="card mb-4">
                    <div className="card-content">
                        <div className="content">
                            <p>{comment.content}</p>
                            <p><strong>Author:</strong> {comment.author.username}</p>
                            <p><strong>Created on:</strong> {new Date(comment.date).toLocaleDateString()}</p>
                            {currentUser?.user?.id === comment.author_id && (
                                <div>
                                    {commentToDelete === comment.id ? (
                                        <div>
                                            <p>Are you sure?</p>
                                            <button className="button is-danger" onClick={() => handleDelete(comment.id)}>Confirm</button>
                                            <button className="button" onClick={() => setCommentToDelete(null)}>Cancel</button>
                                        </div>
                                    ) : (
                                        <button className="button is-danger" onClick={() => setCommentToDelete(comment.id)}>Delete</button>
                                    )}
                                </div>
                            )}
                            <div>
                                <button className="button is-warning" onClick={() => {navigate(`/Comments/edit/${comment.id}`)}}>Edit</button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    
    )
}