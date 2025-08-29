let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let draggedIndex = null;

function addTask() {
  const input = document.getElementById("taskInput");
  const category = document.getElementById("categorySelect").value;
  const taskText = input.value.trim();
  if (taskText === "") return;

  tasks.push({ text: taskText, category, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  input.value = "";
  renderTasks();
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = `${task.text} [${task.category}]`;
    li.className = task.completed ? "completed" : "";
    li.draggable = true;
    li.dataset.index = index;

    li.onclick = () => {
      task.completed = !task.completed;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    };

    li.addEventListener("dragstart", (e) => {
      draggedIndex = index;
    });

    li.addEventListener("dragover", (e) => e.preventDefault());

    li.addEventListener("drop", (e) => {
      const targetIndex = parseInt(e.target.dataset.index);
      const temp = tasks[draggedIndex];
      tasks[draggedIndex] = tasks[targetIndex];
      tasks[targetIndex] = temp;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    });

    if (document.body.classList.contains("dark-mode")) {
      li.classList.add("dark-mode");
    }

    list.appendChild(li);
  });
}

document.getElementById("darkModeToggle").onclick = () => {
  document.body.classList.toggle("dark-mode");
  document.querySelector(".container").classList.toggle("dark-mode");
  renderTasks();
};

window.onload = renderTasks;
