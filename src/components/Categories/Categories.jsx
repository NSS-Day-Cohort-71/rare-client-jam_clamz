import { useEffect, useState } from "react"
import "./Categories.css"
import {  getAllCategories } from "../../managers/CategoryManager"
import CreateCategory from "../CreateCategory/CreateCategory"
import { DeleteCategory } from "./DeleteCategory"
import { useNavigate } from "react-router-dom"
import EditCategory from "./EditCategory"

export const Categories = () => {
    const [allCategories, setAllCategories] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getAllCategories().then(data => {
            setAllCategories(data)
        })
    }, [])

    // useEffect(() => {
    //     navigate(`/category`)
    // }, [onDelete])

    const onDelete = (deletedId) => {
        setAllCategories(prevCategories => prevCategories.filter(category => category?.id !== deletedId));
      };

    return (<>
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
            {CreateCategory()}
        </div>
        </>
    )
}
