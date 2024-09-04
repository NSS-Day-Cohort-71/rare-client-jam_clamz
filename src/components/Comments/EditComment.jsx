import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getCommentById, updateComment } from "../../managers/CommentManager"

export const EditComment = () => {

    const { commentId } = useParams()
    const [comment, setComment] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
       getCommentById(commentId).then((data) => {
        setComment(data)
       })
    }, [commentId])

    const handleInputChange = (e) => {
        const commentCopy = {...comment}
        commentCopy[e.target.name] = e.target.value
        setComment(commentCopy)
    }

    const handleUpdateComment = (e) => {
        e.preventDefault()

        updateComment(comment).then(() => {
            navigate(`/Comments/${comment.post_id}`)
        })

    }

    return (
        <div className="comment-container">
            <div>
                <label>Edit comment:</label>
            </div>
            <textarea rows="10" cols="100" value={comment.content} onChange={handleInputChange} name="content"></textarea>
            <div>
                <button className="button is-primary" onClick={handleUpdateComment}>Update</button>
            </div>
            
        </div>
    )
}
