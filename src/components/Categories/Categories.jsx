import { useEffect, useState } from "react"
import "./Categories.css"
import { getAllCategories } from "../../managers/CategoryManager"

export const Categories = () => {
    const [allCategories, setAllCategories] = useState([])

    useEffect(() => {
        getAllCategories().then(data => {
            setAllCategories(data)
        })
    }, [])

    return (
        <div className="category-list">
            {allCategories.map(category => {
                return (
                    <div className="category-container" key={category.id}>
                        <h2 className="category-label">{category.label}</h2>
                    </div>
                )
            })}
        </div>
    )
}
