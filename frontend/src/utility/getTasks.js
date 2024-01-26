export const getTasks = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/tasks");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching data:", error.msg);
    throw error;
  }
};
