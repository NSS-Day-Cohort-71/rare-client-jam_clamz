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
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(categoryId)
  }).then(res => res.json())
}

export const updateCategory = (categoryId, updatedCategoryData) => {
  return fetch(`http://localhost:8088/category/${categoryId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(updatedCategoryData)
  }).then(res => { res.json();});
}
