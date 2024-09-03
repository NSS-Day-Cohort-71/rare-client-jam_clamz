export const createTag = async (tag) => {
    await fetch("http://localhost:8088/tags", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ label: `${tag}` })
    }).then(response => response.json())
    }