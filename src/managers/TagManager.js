export const createTag = async (tag) => {
    await fetch("http://localhost:8088/tags", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ label: `${tag}` })
    }).then(response => response.json())
    }

    export const getAllTags = () => {
      return fetch("http://localhost:8088/tags").then(res => res.json())
  }

  export const getPostTags = (postId) => {
    return fetch(`http://localhost:8088/posttags?post_id=${postId}`)
      .then((res) => res.json());
  };
  

export const savePostTags = (postId, tagIds) => {
  return fetch(`http://localhost:8088/posttags`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      post_id: postId,
      tag_ids: tagIds,
    }),
  });
};

export const deleteTag = async (tagId) => {
  const response = await fetch(`http://localhost:8088/Tags/${tagId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete the tag.');
  }
};

export const getTagById = async (tagId) => {
  const response = await fetch(`http://localhost:8088/tags/${tagId}`)
  return await response.json()
}

export const updateTag = (tag) => {
  return fetch(`http://localhost:8088/Tags/${tag.id}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(tag)
  })
}

export const removePostTags = (postId, tagIds) => {
  return fetch(`http://localhost:8088/posttags`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      post_id: postId,
      tag_ids: tagIds
    }),
  }).then((res) => {
    if (res.status === 204) {
      return Promise.resolve(); // If no content is returned, resolve the promise
    } else {
      return res.json(); // Otherwise, return the response as JSON
    }
  });
};