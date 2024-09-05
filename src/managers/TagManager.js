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