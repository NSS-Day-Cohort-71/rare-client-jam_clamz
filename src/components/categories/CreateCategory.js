//A button should appear on the Category view that opens the creation box
    //if else statement that looks for the boolean to display the box that switches when clicking the "Create a new category" button
//supply the contents of the box for the Category manager view
//this box should have the text "Create a new category"
//underneath the title should be a single input field with grayed default text "Add text"
    //store the entry in useState
//centered underneath the input field is the "Create" button

import React, { useState } from 'react';
import { createCategory } from '../../managers/CategoryManager';

const CreateCategory = () => {
  // State to control the visibility of the creation form
  const [isVisible, setIsVisible] = useState(false);
  const [categoryName, setCategoryName] = useState('');

  // Handler for the "Create Category" button
  const handleToggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  // Handler for input change
  const handleInputChange = (event) => {
    setCategoryName(event.target.value);
  };

  // Placeholder function for creating a category
  const makeCategory = () => {
    // This function will handle the POST request to create a new category
    createCategory(categoryName)
    console.log('Creating category:', categoryName);
    // TODO: Implement the POST request logic here
  };

  return (
    <div>
      {/* Button to show the category creation form */}
      {!isVisible && (
        <button onClick={handleToggleVisibility}>Create Category</button>
      )}

      {/* Category creation form */}
      {isVisible && (
        <div className="create-category-box">
          <h3>Create a new category</h3>
          <input
            type="text"
            placeholder="Add text"
            value={categoryName}
            onChange={handleInputChange}
          />
          <button onClick={makeCategory}>Create</button>
        </div>
      )}
    </div>
  );
};

export default CreateCategory;



//Create a post function in the Category manager
    //invokes create_category function in API
//create a category view in the views directory in the api
    //should house the post function for the create_category
//Add to the if...else statement in the json file for do_POST to check for "category" in the url

//remember to add the navbar link