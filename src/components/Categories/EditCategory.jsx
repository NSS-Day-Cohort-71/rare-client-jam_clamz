import React, { useState } from 'react';
import { updateCategory } from '../../managers/CategoryManager';

const EditCategory = ({ categoryObj }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedLabel, setEditedLabel] = useState(categoryObj.label);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    updateCategory(categoryObj.id, { label: editedLabel })
      .then(updatedCategory => {
        console.log('Category updated successfully:', updatedCategory);
        setIsEditing(false); // Exit edit mode after saving
      })
      .catch(error => {
        console.error('Failed to update category:', error);
      });
  };

  const handleChange = (e) => {
    setEditedLabel(e.target.value);
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <input 
            type="text"
            name="label"
            value={editedLabel}
            onChange={handleChange}
          />
          <button onClick={handleSaveClick}>Save</button>
        </div>
      ) : (
        <div>
          <h3>{categoryObj.label}</h3>
          <button onClick={handleEditClick}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default EditCategory;
