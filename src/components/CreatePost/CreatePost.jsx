import { useEffect, useState } from "react";
import "./CreatePost.css";
import { fetchCurrentUser } from "../../managers/UserManager";
import { savePost } from "../../managers/PostManager";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "../../managers/CategoryManager";

export const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState([]);
    const [headerImageUrl, setHeaderImageUrl] = useState('');
    const [currentUser, setCurrentUser] = useState({});
    const navigate = useNavigate();

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

    useEffect(() => {
        const fetchCategories = async () => {
            const categoriesData = await getAllCategories();
            setCategories(categoriesData);
        };

        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (categoryId === "") {
            alert("Please select a category.");
            return;
        }

        const post = {
            title,
            content,
            category: parseInt(categoryId, 10), // Ensure categoryId is sent as a number
            publicationDate: new Date().toISOString(),
            headerImageUrl,
            author: currentUser.first_name,
            approved: true
        };

        await savePost(post);
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
                        <div className="select">
                            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
                                <option value="">Select a category</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Header Image URL</label>
                    <div className="control">
                        <input className="input" type="text" value={headerImageUrl} onChange={(e) => setHeaderImageUrl(e.target.value)} />
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <button className="button is-primary" type="submit">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    );
};