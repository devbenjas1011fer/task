const API_URL = "http://localhost:3000";

async function fetchTasks() {
  const response = await fetch(API_URL + "/task", {
    method: "GET",
    headers: { "Content-Type": "application/json", "User-Agent": "xd" },
  });
  return response.json();
}

async function addTask(title, description) {
  const response = await fetch(API_URL + "/task", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description }),
  });
  return response.json();
}

async function deleteTask(id) {
  await fetch(`${API_URL}/task/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
}

async function updateTask(id, newData) {
  const response = await fetch(`${API_URL}/task/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newData),
  });
  return response.json();
} 



async function completeTask(id) {console.log(id)
    const response = await fetch(`${API_URL}/task/complete/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" } 
    });
    return response.json();
  } 