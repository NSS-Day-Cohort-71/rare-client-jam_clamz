import { useEffect, useState } from "react";
import "./MyPosts.css";
import { getPostsbyUserId } from "../../managers/PostManager";

export const MyPosts = () => {
    const [posts, setPosts] = useState([]);
    const userId = parseInt(localStorage.getItem('auth_token'));

    useEffect(() => {
        getPostsbyUserId(userId).then(data => {
            setPosts(data);
        });
    }, []);


    return (
        <div className="my-posts container">
            <h2 className="title">My Posts</h2>
            <div className="columns is-multiline">
                {posts.map(post => (
                    <div className="column is-one-third" key={post.id}>
                        <div className="card">
                            <div className="card-content">
                                <p className="title">{post.title}</p>
                                <p className="subtitle">{post.author.first_name} {post.author.last_name}</p>
                                <p>{post.category.label}</p>
                            </div>
                            <footer className="card-footer">
                                <button className="button is-link card-footer-item">Edit</button>
                                <button className="button is-danger card-footer-item">Delete</button>
                                <button className="button is-primary card-footer-item">Publish</button>
                                <button className="button is-warning card-footer-item">Unpublish</button>
                            </footer>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};