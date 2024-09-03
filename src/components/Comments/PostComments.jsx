// TODO: Post Details will have a View Comments button that re-direct them to comments for that post where a title of the related Post should be displayed at the top of the page
// needs to display the following information for each comment:
// - Subject
// - Author's Display Name

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getCommentsByPostId } from "../../managers/CommentManager"
import { getPostById } from "../../managers/PostManager"

export const PostComments = () => {
    const [comments, setComments] = useState([])
    const [post, setPost] = useState({})
    const { postId } = useParams()

    useEffect(() => {
        getCommentsByPostId(postId).then(data => {
            setComments(data)
        })

        getPostById(postId).then(data => {
            setPost(data)
        })
    }, [postId])


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
                        </div>
                    </div>
                </div>
            ))}
        </div>
    
    )
}