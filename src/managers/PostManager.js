export const savePost = async (post) => {
    const response = await fetch('http://localhost:8088/Posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    });

    const newPost = await response.json();

    return newPost;
}

export const getAllPosts = () => {
    return fetch("http://localhost:8088/Posts").then(res => res.json())
}

export const getPostsByUserId = async (userId) => {
    try {
        const response = await fetch(`http://localhost:8088/My-Posts?userId=${userId}&_expand=user`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error.message);
        throw error;
    }
};

export const getPostById = (postId) => {
    return fetch(`http://localhost:8088/Posts/${postId}`).then(res => res.json())
}

export const updatePost = async (postId, post) => {
    const response = await fetch(`http://localhost:8088/Posts/${postId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    });

    const updatedPost = await response.json();

    return updatedPost;
}
export const deletePost = (postId) => {
    return fetch(`http://localhost:8088/Posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
  })
}
