export const postTask = async (task) => {
  try {
    const response = await fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error("Failed to add task");
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding task:", error);
  }
};
