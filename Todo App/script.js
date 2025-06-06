document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById(`todo-input`);
  const todoBtn = document.getElementById(`todo-btn`);
  const todoList = document.getElementById(`todo-list`);

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => renderTask(task));

  // The event listner is for add todo button
  todoBtn.addEventListener("click", () => {
    addTodo();
  });
  // This event listener listens to the enter key in our keyboard
  todoInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  });

  function addTodo() {
    const taskText = todoInput.value.trim();
    if (taskText === "") return;

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };
    tasks.push(newTask);
    saveTasks();
    renderTask(newTask);
    todoInput.value = "";
    console.log(tasks);
  }

  // we also want to render the list on visiting the todo app which was the todo we added before. so for these we are creating another function named renderTasks which will render our task whenever we revisit the website/todo-app
  function renderTask(task) {
    let li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    li.setAttribute("target", "_blank");
    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
    <span>${task.text}</span>
    <button>delete</button>
    `;
    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;
      task.completed = !task.completed;
      li.classList.toggle("completed");
      saveTasks();
    });

    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation();
      tasks = tasks.filter((t) => t.id !== task.id);
      li.remove();
      saveTasks();
    });
    todoList.appendChild(li);
  }

  // added task to local storage
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
