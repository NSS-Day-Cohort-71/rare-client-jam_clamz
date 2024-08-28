import { useEffect, useState } from "react"
import "./Categories.css"
import {  getAllCategories } from "../../managers/CategoryManager"
import CreateCategory from "../CreateCategory/CreateCategory"
import { DeleteCategory } from "./DeleteCategory"

export const Categories = () => {
    const [allCategories, setAllCategories] = useState([])

    useEffect(() => {
        getAllCategories().then(data => {
            setAllCategories(data)
        })
    }, [])

    const onDelete = (deletedId) => {
        setAllCategories(prevCategories => prevCategories.filter(category => category?.id !== deletedId));
      };

    return (<>
        <div className="category-list">
            {allCategories.map(category => (
                
                    <div className="category-container" key={category.id}>
                        <h2 className="category-label">{category.label}</h2>
                    
                    <DeleteCategory categoryObj={category} onDelete={onDelete} />
                    </div>
            ))}
        </div>
        <div>
            {CreateCategory()}
        </div>
        </>
    )
}
