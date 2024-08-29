import React, { useEffect, useState } from 'react';
import { createCategory } from '../../managers/CategoryManager';
import { useNavigate } from 'react-router-dom';

const CreateCategory = ({ onCategoryCreated }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const navigate = useNavigate();

  const handleToggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleInputChange = (event) => {
    setCategoryName(event.target.value);
  };

  // const exitCreation = () => {
  //   handleToggleVisibility()
  // }

  const makeCategory = () => {
    createCategory(categoryName);  // Wait for category creation
    setIsVisible(false) //Hide the creation form
    setCategoryName('');  // Reset the input field

    // Update the category list with the newly created category
    // setAllCategories(prevCategories => [...prevCategories, newCategory]);
    setTimeout(() => {
      onCategoryCreated();
      // navigate(`/category`);
  }, 500); // 500ms delay
    console.log('Creating category:', categoryName);
    // navigate(`/category`);  // Optionally navigate to the category page

  };


  return (
    <div>
      {!isVisible && (
        <button onClick={handleToggleVisibility}>Create Category</button>
      )}
      {isVisible && (
        <div className="create-category-box">
          <h3>Create a new category</h3>
          <input
            type="text"
            placeholder="Add text"
            value={categoryName}
            onChange={handleInputChange}
          />
          <button onClick={makeCategory}>Save</button>

        </div>
      )}
    </div>
  );
};

export default CreateCategory;
