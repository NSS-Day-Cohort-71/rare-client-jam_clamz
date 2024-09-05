import { useEffect, useState } from "react"
import "./Tags.css"
import CreateTags from "./CreateTags";
import { deleteTag, getAllTags } from "../../managers/TagManager";
import { useNavigate } from "react-router-dom";


export const Tags = () => {
    const [allTags, setAllTags] = useState([]);
    const [tagToDelete, setTagToDelete] = useState(null)
    const navigate = useNavigate()

    // Initial fetch of tags when the component mounts
    useEffect(() => {
        const fetchTags = () => {
            getAllTags().then(data => {
                setAllTags(data);
            });
        };

        fetchTags();
    }, []);

    const handleDelete = async (tagId) => {
        await deleteTag(tagId)
        getAllTags().then(data => {
            setAllTags(data)
        })
        setTagToDelete(null)
    }

    const confirmDelete = (tagId) => {
        setTagToDelete(tagId)
    }

    const cancelDelete = () => {
        setTagToDelete(null)
    }

    return (
        <>
            <div className="container">
                <div className="columns is-multiline">
                    {allTags.map(tagObj => (
                        <div className="column is-one-quarter" key={tagObj.id}>
                            <div className="box">
                                <div className="level">
                                    <div className="level-left">
                                        <h2 className="title is-4">{tagObj.label}</h2>
                                    </div>
                                    <div className="level-right">
                                        {tagToDelete === tagObj.id ? (
                                            <>
                                                <button
                                                    className="button is-danger is-small"
                                                    onClick={() => handleDelete(tagObj.id)}
                                                >
                                                    Confirm
                                                </button>
                                                <button
                                                    className="button is-light is-small"
                                                    onClick={cancelDelete}
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                            <button
                                                className="button is-danger is-small"
                                                onClick={() => confirmDelete(tagObj.id)}
                                            >
                                                Delete
                                            </button>
                                            <button
                                                className="button is-warning is-small"
                                                onClick={() => {
                                                    navigate(`edit/${tagObj.id}`)
                                                }}
                                            >
                                                Edit
                                            </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="section">
                    <CreateTags onTagCreated={() => getAllTags().then(data => setAllTags(data))} />
                </div>
            </div>
        </>
    )
};
