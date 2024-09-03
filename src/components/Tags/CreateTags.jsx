import { useState } from "react";
import { createTag } from "../../managers/TagManager";

const CreateTag = ({ onTagCreated }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [tagName, setTagName] = useState('');
    
  
    const handleToggleVisibility = () => {
      setIsVisible(!isVisible);
    };
  
    const handleInputChange = (event) => {
      setTagName(event.target.value);
    };
  
    const makeTag = () => {
      createTag(tagName);  // Wait for tag creation
      setIsVisible(false) //Hide the creation form
      setTagName('');  // Reset the input field
  
      setTimeout(() => {
        onTagCreated();
    }, 500); // 500ms delay
      console.log('Creating tag:', tagName);
  
    };
  
  
    return (
      <div>
        {!isVisible && (
          <button onClick={handleToggleVisibility}>Create Tag</button>
        )}
        {isVisible && (
          <div className="create-tag-box">
            <h3>Create a new tag</h3>
            <input
              type="text"
              placeholder="Add text"
              value={tagName}
              onChange={handleInputChange}
            />
            <button onClick={makeTag}>Save</button>
  
          </div>
        )}
      </div>
    );
  };
  
  export default CreateTag;