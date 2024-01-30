import { url } from "./url";

export const getTasks = async () => {
  try {
    const response = await fetch(`${url}/api/tasks`);
    if (!response.ok) {
      throw new Error("Failed to get tasks");
    }

    const data = await response.json();

    return data;
  } catch (err) {
    console.error("Error getting tasks:", err.msg);
    throw err;
  }
};

export const postTask = async (task) => {
  try {
    const response = await fetch(`${url}/api/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error("Failed to post task");
    }

    const potedTask = await response.json();

    return potedTask._id;
  } catch (err) {
    console.error("Error adding task:", err);
  }
};

export const deleteTask = async (_id) => {
  try {
    const deleteTaskResponse = await fetch(`${url}/api/tasks/${_id}`, {
      method: "DELETE",
    });

    if (!deleteTaskResponse.ok) throw new Error("Failed to delete task!");
  } catch (err) {
    console.error(`Error deleting task: ${err}`);
  }
};

export const putTask = async ({ selectedTaskId, currentTask }) => {
  console.log(currentTask);
  try {
    const putTaskReponse = await fetch(`${url}/api/tasks/${selectedTaskId}`, {
      method: "PUT",
      body: JSON.stringify(currentTask),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!putTaskReponse.ok) throw new Error("Failed to update task!");
  } catch (err) {
    console.error(`Failed updating task: ${err.msg}`);
  }
};
