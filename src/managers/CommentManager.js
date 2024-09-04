export const saveComment = async (comment) => {
    const response = await fetch('http://localhost:8088/Comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    });

    const newComment = await response.json();

    return newComment;
}

export const getCommentsByPostId = async (postId) => {
    const response = await fetch(`http://localhost:8088/Comments?post_id=${postId}&_expand=author`)
    return await response.json()
}

export const deleteComment = async (commentId) => {
    const response = await fetch(`http://localhost:8088/Comments/${commentId}`, {
        method: 'DELETE'
    });

    if (response.status === 204) {
        return null;
    }

    return await response.json();
}

export const getCommentById = async (commentId) => {
    const response = await fetch(`http://localhost:8088/Comments/${commentId}`)
    return await response.json()
}