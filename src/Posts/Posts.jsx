import { useEffect } from "react"
import { useState } from "react"
import { getAllPosts } from "../managers/PostManager"

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
                    <div className="post-container">
                        <h2>{post.title}</h2>
                        <div>{post.first_name} {post.last_name}</div>
                        <div>{post.label}</div>
                    </div>
                )
            })}
        </div>
    )

}