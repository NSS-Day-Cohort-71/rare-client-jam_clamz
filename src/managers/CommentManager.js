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