import React, { useState, useEffect } from "react";
import { getAllTags, savePostTags } from "../../managers/TagManager";
import { useParams, useNavigate } from "react-router-dom";

const TagPost = ({ triggerReRender, setTriggerReRender }) => {
  const { postId } = useParams(); // Extract the post ID from the URL
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  // Fetch all tags when component mounts
  useEffect(() => {
    getAllTags().then(setTags);
  }, []);

  // Toggle visibility of the tag management section
  const handleToggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  // Handle checkbox selection
  const handleTagSelection = (tagId) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter((id) => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  // Save selected tags and associate them with the post
  const handleSave = async () => {
    await savePostTags(postId, selectedTags); // Pass postId and selected tags
    setTriggerReRender(!triggerReRender); // Trigger re-render after saving
    setIsVisible(false); // Hide the tag management section
    navigate(`/posts/${postId}`); // Refresh the page for the post
  };

  return (
    <div>
      <button onClick={handleToggleVisibility}>Manage Tags</button>
      {isVisible && (
        <div>
          <h3>Select Tags for this Post</h3>
          {tags.map((tag) => (
            <div key={tag.id}>
              <input
                type="checkbox"
                checked={selectedTags.includes(tag.id)}
                onChange={() => handleTagSelection(tag.id)}
              />
              <label>{tag.label}</label>
            </div>
          ))}
          <button onClick={handleSave}>Save</button>
        </div>
      )}
    </div>
  );
};

export default TagPost;
