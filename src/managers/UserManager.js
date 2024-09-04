export const fetchCurrentUser = async (id) => {
    const response = await fetch(`http://localhost:8088/Users/${id}`);
    const data = await response.json();
    return data;
}