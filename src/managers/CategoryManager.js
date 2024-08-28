export const createCategory = (category) => {
    return fetch("http://localhost:8088/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(category)
    }).then(res => res.json())
  }

  export const getAllCategories = () => {
    return fetch("http://localhost:8088/category").then(res => res.json())
}