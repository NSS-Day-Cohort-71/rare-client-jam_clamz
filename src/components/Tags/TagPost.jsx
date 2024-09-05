import React, { useState, useEffect } from "react";
import { getAllTags, savePostTags, removePostTags, getPostTags } from "../../managers/TagManager";
import { useParams, useNavigate } from "react-router-dom";

const TagPost = ({ triggerReRender, setTriggerReRender }) => {
  const { postId } = useParams(); // Extract the post ID from the URL
  const [tags, setTags] = useState([]);
  const [appliedTags, setAppliedTags] = useState([]); // Tags already applied to the post
  const [selectedTagsToAdd, setSelectedTagsToAdd] = useState([]); // Tags selected to be added
  const [selectedTagsToRemove, setSelectedTagsToRemove] = useState([]); // Tags selected to be removed
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  // Fetch all tags and applied tags when component mounts
  useEffect(() => {
    getAllTags().then(setTags);
    getPostTags(postId).then(setAppliedTags); // Fetch applied tags for the post
  }, [postId, ]);

  // Toggle visibility of the tag management section
  const handleToggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  // Handle checkbox selection for adding tags
  const handleTagSelectionToAdd = (tagId) => {
    if (selectedTagsToAdd.includes(tagId)) {
      setSelectedTagsToAdd(selectedTagsToAdd.filter((id) => id !== tagId));
    } else {
      setSelectedTagsToAdd([...selectedTagsToAdd, tagId]);
    }
  };

  // Handle checkbox selection for removing tags
  const handleTagSelectionToRemove = (tagId) => {
    if (selectedTagsToRemove.includes(tagId)) {
      setSelectedTagsToRemove(selectedTagsToRemove.filter((id) => id !== tagId));
    } else {
      setSelectedTagsToRemove([...selectedTagsToRemove, tagId]);
    }
  };

  // Save new tags and associate them with the post
  const handleSaveTags = async () => {
    await savePostTags(postId, selectedTagsToAdd); // Add selected tags
    setIsVisible(false); // Hide the tag management section
    setTimeout(() => {
      setTriggerReRender(!triggerReRender); // Trigger re-render after saving
    
    navigate(`/posts/${postId}`); // Refresh the page for the post
  }, 500);
    
  };

  // Remove tags from the post
  const handleRemoveTags = async () => {
    await removePostTags(postId, selectedTagsToRemove); // Remove selected tags
    setIsVisible(false); // Hide the tag management section
    setTimeout(() => {
      setTriggerReRender(!triggerReRender); // Trigger re-render after saving
    
    navigate(`/posts/${postId}`); // Refresh the page for the post
  }, 500);
    
  };

  // Separate tags into two groups: applied tags and non-applied tags
  const nonAppliedTags = tags.filter(tag => !appliedTags.some(appliedTag => appliedTag.id === tag.id));

  return (
    <div>
      <button onClick={handleToggleVisibility}>Manage Tags</button>
      {isVisible && (
        <div>
          <h3>Applied Tags</h3>
          {appliedTags.map((tag) => (
            <div key={tag.id}>
              <input
                type="checkbox"
                checked={selectedTagsToRemove.includes(tag.id)}
                onChange={() => handleTagSelectionToRemove(tag.id)}
              />
              <label>{tag.label}</label>
            </div>
          ))}
          <button onClick={handleRemoveTags}>Save</button>

          <h3>Available Tags</h3>
          {nonAppliedTags.map((tag) => (
            <div key={tag.id}>
              <input
                type="checkbox"
                checked={selectedTagsToAdd.includes(tag.id)}
                onChange={() => handleTagSelectionToAdd(tag.id)}
              />
              <label>{tag.label}</label>
            </div>
          ))}
          <button onClick={handleSaveTags}>Save</button>
        </div>
      )}
    </div>
  );
};

export default TagPost;
