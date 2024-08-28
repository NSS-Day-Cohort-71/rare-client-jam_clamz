import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteCategory } from "../../managers/CategoryManager";



export const DeleteCategory = ({ categoryObj, onDelete }) => {
    const [confirmDelete, setConfirmDelete] = useState(false);
    

    
  
  
    const handleDelete = () => {
        deleteCategory(categoryObj.id).then(() => {
          console.log('Category deleted:', categoryObj.id);
          onDelete(categoryObj.id); // Update UI accordingly
        }).catch(error => {
          console.error('Error deleting category:', error.message);
        });
      };


    return (
      <div className="delete-category">
        {confirmDelete ? (
          <>
            <button type="button" onClick={handleDelete}>Are You Sure?</button>
            <button type="button" onClick={() => setConfirmDelete(false)}>Cancel</button>
          </>
        ) : (
          <button type="button" onClick={() => setConfirmDelete(true)}>Delete</button>
        )}
      </div>
    );
  };