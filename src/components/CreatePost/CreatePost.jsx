import { useEffect, useState } from "react";
import "./CreatePost.css";
import { fetchCurrentUser } from "../../managers/UserManager";
import { savePost } from "../../managers/PostManager";
import { useNavigate } from "react-router-dom";

export const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [headerImageUrl, setHeaderImageUrl] = useState('');
    const [currentUser, setCurrentUser] = useState({});
    const navigate = useNavigate()

    useEffect(() => {
        const getCurrentUser = async () => {
            // Retrieve the primary key from local storage
            const userId = localStorage.getItem('auth_token');
            if (userId) {
                const userData = await fetchCurrentUser(userId);
                setCurrentUser(userData);
            } else {
                console.error('No user ID found in local storage');
            }
        };

        getCurrentUser();
    }, []);

    // TODO: I need a GET request supported in the API to get the current user's information

    const handleSubmit = async (e) => {
        e.preventDefault();
        const post = {
            title,
            content,
            category,
            publicationDate: new Date().toISOString(),
            headerImageUrl,
            author: currentUser.first_name,
            approved: true
        };

        // Save post to database
        savePost(post);

        navigate(`/my-posts/`);
    };

    return (
        <div className="container">
            <h1 className="title">Create Post</h1>
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label className="label">Title</label>
                    <div className="control">
                        <input className="input" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Content</label>
                    <div className="control">
                        <textarea className="textarea" value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Category</label>
                    <div className="control">
                        <input className="input" type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Header Image URL</label>
                    <div className="control">
                        <input className="input" type="text" value={headerImageUrl} onChange={(e) => setHeaderImageUrl(e.target.value)} />
                    </div>
                </div>
                <div className="control">
                    <button className="button is-primary" type="submit">Create Post</button>
                </div>
            </form>
        </div>
    );
};