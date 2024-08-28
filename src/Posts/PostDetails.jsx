import { useEffect, useState } from "react"
import { getPostById } from "../managers/PostManager"
import { useParams } from "react-router-dom"
import "./Posts.css"

export const PostDetails = () => {

    const [post, setPost] = useState({})
    const {postId} = useParams()

    useEffect(() => {
        getPostById(postId).then(data => {
            setPost(data)
        })
    }, [postId])

    return (
        <div className="details-container">
            <div className="details-title">{post.title}</div>
            <img src={post.image_url} alt={post.title} className="details-img"></img>
            <div className="details-content">{post.content}</div>
            <div className="details-date">Published on: {post.publication_date}</div>
            <div className="details-author">Written by: {post.first_name} {post.last_name}</div>
        </div>
    )
}