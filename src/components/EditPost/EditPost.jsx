import "./EditPost.css";
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById, updatePost } from "../../managers/PostManager";
import { getAllCategories } from "../../managers/CategoryManager";
import { fetchCurrentUser } from "../../managers/UserManager";

export const EditPost = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [headerImageUrl, setHeaderImageUrl] = useState('');
    const [currentUser, setCurrentUser] = useState({});
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // fetch current user data
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
        // Fetch categories from the database
        const fetchCategories = async () => {
            const categoriesData = await getAllCategories();
            setCategories(categoriesData);
        };
                
        // Fetch post data by ID
        const fetchPost = async () => {
            const postData = await getPostById(postId);
            setTitle(postData.title);
            setContent(postData.content);
            setCategoryId(postData.category_id);
            setHeaderImageUrl(postData.image_url);
        };

        fetchCategories();
        fetchPost();
    }, [postId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (categoryId === "") {
            alert("Please select a category.");
            return;
        }

        const updatedPost = {
            title,
            content,
            category: parseInt(categoryId, 10),
            headerImageUrl,
            publicationDate: new Date().toISOString(),
            author: currentUser.first_name, 
            approved: true
        };

        await updatePost(postId, updatedPost);
        navigate(`/Posts/` + postId);
    };

    return (
        <div className="container">
            <h1 className="title">Edit Post</h1>
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
                        <button className="button is-secondary" onChange={(e) => {navigate(`/Posts/`)}}>Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    );
};
