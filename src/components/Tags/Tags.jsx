
import { useEffect, useState } from "react"
import "./Tags.css"

import CreateTags from "./CreateTags";
import { getAllTags } from "../../managers/TagManager";



export const Tags = () => {
    const [allTags, setAllTags] = useState([]);

    // Function to fetch tags from the API
    const fetchTags = () => {
        getAllTags().then(data => {
            setAllTags(data);
        });
    };

    // Initial fetch of tags when the component mounts
    useEffect(() => {
        fetchTags();
    }, []);


    

    return (
        <>
            <div className="tag-list">
                {allTags.map(tagObj => (
                    <div className="tag-container" key={tagObj.id}>
                        <h2 className="tag-label">{tagObj.label}</h2>
                    


                    </div>
                ))}
            </div>
            <div>
              
                <CreateTags onTagCreated={fetchTags} />
            </div>
            <div>
                
            </div>
        </>
    );
};
