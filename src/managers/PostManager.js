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
    return await fetch(`http://localhost:8088/Posts?userId=${userId}&_expand=user`).then(res => res.json());
}

// TODO: we want to be able to &_expand=user on the above function