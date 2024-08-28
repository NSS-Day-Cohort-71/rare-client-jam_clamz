import { useEffect } from "react"
import { useState } from "react"
import { getAllPosts } from "../managers/PostManager"
import "./Posts.css"
import { Link } from "react-router-dom"

export const Posts = () => {
    const [allPosts, setAllPosts] = useState([])

    useEffect(() => {
        getAllPosts().then(data => {
            setAllPosts(data)
        })
    }, [setAllPosts])

    return (
        <div className="post-list">
            {allPosts.map(post => {
                return (

                    <Link to={`/Posts/${post.id}`} className="post-link">
                        <div className="post-container">
                            <h2 className="post-title">{post.title}</h2>
                            <div className="post-author">{post.first_name} {post.last_name}</div>
                            <div className="post-category">{post.label}</div>
                        </div>
                    </Link>
                )
            })}
        </div>
    )

}