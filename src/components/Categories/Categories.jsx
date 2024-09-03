
import { useEffect, useState } from "react"
import "./Categories.css"
import {  getAllCategories } from "../../managers/CategoryManager"
import CreateCategory from "../CreateCategory/CreateCategory"
import { DeleteCategory } from "./DeleteCategory"
import { useNavigate } from "react-router-dom"
import EditCategory from "./EditCategory"
import CreateTag from "../Tags/CreateTags"


export const Categories = () => {
    const [allCategories, setAllCategories] = useState([]);

    // Function to fetch categories from the API
    const fetchCategories = () => {
        getAllCategories().then(data => {
            setAllCategories(data);
        });
    };

    // Initial fetch of categories when the component mounts
    useEffect(() => {
        fetchCategories();
    }, []);

    const onDelete = (deletedId) => {
        fetchCategories();
    };

    

    return (
        <>
            <div className="category-list">
                {allCategories.map(categoryObj => (
                    <div className="category-container" key={categoryObj.id}>
                        <h2 className="category-label">{categoryObj.label}</h2>
                    
                    <EditCategory categoryObj={categoryObj} />
                    <DeleteCategory categoryObj={categoryObj} onDelete={onDelete} />

                    </div>
                ))}
            </div>
            <div>
                {/* Add the CreateCategory component */}
                <CreateCategory onCategoryCreated={fetchCategories} />
            </div>
            <div>
                
            </div>
        </>
    );
};
