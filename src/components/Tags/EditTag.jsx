import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getTagById, updateTag } from "../../managers/TagManager"

export const EditTag = () => {

    const { tagId } = useParams()
    const [tag, setTag] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        getTagById(tagId).then(data => {
            setTag(data)
        })
    }, [tagId])

    const handleInputChange = (e) => {
        const tagCopy = {...tag}
        tagCopy[e.target.name] = e.target.value
        setTag(tagCopy)
    }

    const handleTagUpdate = (e) => {
        e.preventDefault()

        updateTag(tag).then(() => {
            navigate(`/Tags`)
        })

    }

    return (
        <>
        <h1>Edit Tag</h1>
        <input 
            type="text"
            value={tag.label}
            name="label"
            onChange={handleInputChange}
            >
        </input>
        <button
            className="button is-warning is-small"
            onClick={handleTagUpdate}
            >
                Update
        </button>
        </>
)
}