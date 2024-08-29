export const createCategory = async (category) => {
  await fetch("http://localhost:8088/category", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ label: `${category}` })
  }).then(response => response.json())
  }

  export const getAllCategories = () => {
    return fetch("http://localhost:8088/category").then(res => res.json())
}

export const deleteCategory = (categoryId) => {
  return fetch(`http://localhost:8088/category/${categoryId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(response => {
    if (response.ok) {
      // If the response is OK but contains no content, return a simple confirmation
      return Promise.resolve();
    } else {
      return response.json(); // This handles any error messages returned in JSON format
    }
  });
};
