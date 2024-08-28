import { useEffect, useState } from "react"
import { getPostById } from "../managers/PostManager"
import { useParams } from "react-router-dom"

export const PostDetails = () => {

    const [post, setPost] = useState({})
    const {postId} = useParams()

    useEffect(() => {
        getPostById(postId).then(data => {
            setPost(data)
        })
    }, [postId])
}