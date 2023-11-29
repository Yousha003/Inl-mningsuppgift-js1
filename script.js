const todoList = document.getElementById("todoList");
const listItem = document.createElement("li");
const submitBtn = document.querySelector("#addtodo");
const todoInput = document.querySelector("#todoInput");
const clearText = document.querySelector(".todoInput");
const errorMessage = document.querySelector("#errorMessage");
const toDoArray = [];
let BASE_URL =
  "https://js1-todo-api.vercel.app/api/todos?apikey=b919ecca-8445-4a12-8e83-f90f506f5db6";

// Fetch get todos
window.onload = function () {
  fetch(BASE_URL)
    .then((response) => response.json())
    .then((todos) => {
      // Get the todo list element
      const todoList = document.getElementById("todoList");
      todos.forEach((todo) => {
        toDoArray.push(todo);
      });
      console.log(toDoArray);
      // Iterate through the todos and add them to the list
      for (let i = 0; i < todos.length; i++) {
        let todo = todos[i];
        let listItem = document.createElement("li");
        listItem.innerText = todo.title;
        listItem.setAttribute("data-id", todo._id);
        listItem.innerHTML +=
          ' <button onclick="removeTodo(this)">Remove</button>';
        todoList.appendChild(listItem);
      }
    });
};
// Remove todo
function removeTodo(element) {
  const todoId = element.parentNode.dataset.id;
  console.log(todoId);
  fetch(
    `https://js1-todo-api.vercel.app/api/todos/${todoId}?apikey=b919ecca-8445-4a12-8e83-f90f506f5db6`,
    {
      method: "DELETE",
    }
  ).then((response) => {
    if (response.ok) {
      console.log(response);
      const index = toDoArray.indexOf((todoId) => todoId == index);
      toDoArray.splice(index, 1);
      element.parentNode.remove();
    } else {
      console.log("Fetch failed");
    }
  });
}
// Validation no empty todo
function addTodo(e) {
  e.preventDefault();
  const todoInput = document.getElementById("todoInput").value;
  if (todoInput.trim() === "") {
    errorMessage.classList.remove("d-none");
    return;
  }
  errorMessage.classList.add("d-none");
  // Send to API
  const newTodo = {
    userId: 11,
    title: todoInput,
    completed: false,
  };
  fetch(
    "https://js1-todo-api.vercel.app/api/todos?apikey=b919ecca-8445-4a12-8e83-f90f506f5db6",
    {
      method: "POST",
      body: JSON.stringify(newTodo),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  )
    .then((response) => response.json())
    .then((json) => {
      toDoArray.push(json);
      console.log(toDoArray);
      console.log(json);
      console.log("clear text");
      clearText.value = "";
      //   Add to the list
      let listItem = document.createElement("li");
      listItem.innerText = todoInput;
      listItem.setAttribute("data-id", json._id);
      listItem.innerHTML +=
        ' <button onclick="removeTodo(this)">Remove</button>';
      todoList.appendChild(listItem);
    });
}
submitBtn.addEventListener("click", addTodo);
