document.addEventListener('DOMContentLoaded', loadTasks);

let editingTaskId = null;  
 
document.getElementById('task-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    if (title.trim()) {
        if (editingTaskId) { 
            await updateTask(editingTaskId, {title,  description});
            editingTaskId = null;   
            document.getElementById('task-form').reset();
            document.getElementById('task-form').querySelector('button').innerText = 'Add Task'; 
            loadTasks()

        } else { 
            const newTask = await addTask(title, description);
            addTaskToDOM(newTask);
        }
    }
});
async function loadTasks() {
    const tasks = await fetchTasks();
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';  
    tasks.forEach(addTaskToDOM);  
}   
function addTaskToDOM(task) {
    const taskList = document.getElementById('task-list');
    
    const li = document.createElement('li');
    li.id = task.id; 
    
    li.innerHTML = `
        <span><strong>${task.titulo}</strong>: ${task.descripcion}</span>
        <button onclick="editTask('${task.id}')">✏️</button>    
        <button onclick="removeTask('${task.id}', this)">❌</button>
    `;
    
    taskList.appendChild(li);
}

async function editTask(id) {
    const tasks = await fetchTasks();
    const taskToEdit = tasks.find(task => task.id === id);
    document.getElementById('title').value = taskToEdit.titulo;
    document.getElementById('description').value = taskToEdit.descripcion;
    document.getElementById('task-form').querySelector('button').innerText = 'Update Task';
    
    editingTaskId = taskToEdit.id;
}

async function removeTask(id, btn) {
    await deleteTask(id);
    btn.parentElement.remove();
}
 