let taskInput = document.getElementById("taskInput");
let taskList = document.getElementById("taskList");

window.onload = loadTasks;

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const li = createTaskElement(taskText);
  taskList.appendChild(li);
  saveTasks();

  taskInput.value = "";
}

function createTaskElement(text) {
  const li = document.createElement("li");

  li.textContent = text;
  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  const delBtn = document.createElement("button");
  delBtn.textContent = "X";
  delBtn.className = "delete-btn";
  delBtn.addEventListener("click", () => {
    li.remove();
    saveTasks();
  });

  li.appendChild(delBtn);
  return li;
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.childNodes[0].nodeValue.trim(),
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  tasks.forEach(task => {
    const li = createTaskElement(task.text);
    if (task.completed) li.classList.add("completed");
    taskList.appendChild(li);
  });
}
