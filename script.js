const form = document.getElementById("form");
const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const message = document.getElementById("message");
const description = document.getElementById("description");
const tasks = document.getElementById("tasks");
const addTask = document.getElementById("addTask");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  formValidation();
});

function formValidation() {
  if (taskInput.value === "") {
    message.innerHTML = `Tasks cannot be left blank!`;
  } else {
    message.innerHTML = ``;
    getData();
    addTask.setAttribute("data-bs-dismiss", "modal");
    addTask.click();

    (() => {
      addTask.setAttribute("data-bs-dismiss", "");
    })();
  }
};

let data = [{}];

function getData() {
  data.push({
    text: taskInput.value,
    date: dateInput.value,
    description: description.value,
  });

  localStorage.setItem("data", JSON.stringify(data));
  createTasks();
}

function createTasks() {
  tasks.innerHTML = ``;
  data.map((x, y) => {
    return (tasks.innerHTML += `
      <div id=${y}>
        <span class="fw-bold">${x.text}</span>
        <span class="small text-secondary">${x.date}</span>
        <p>${x.description}</p>

        <span>
          <i onClick="editTasks(this)" data-bs-toggle="modal" data-bs-target="#form" class="fa fa-edit"></i>
          <i onClick="deleteTasks(this);createTasks()" class="fa fa-trash"></i>
        </span>
      </div>
    `);
  });
  reset();
}

function reset() {
  taskInput.value = "";
  dateInput.value = "";
  description.value = "";
}

(() => {
  data = JSON.parse(localStorage.getItem("data")) || []
  console.log(data);
  createTasks();
})();

function deleteTasks(event) {
  event.parentElement.parentElement.remove();
  data.splice(event.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
}

function editTasks(event) {
  let selectedTask = event.parentElement.parentElement;

  taskInput.value = selectedTask.children[0].innerHTML;
  dateInput.value = selectedTask.children[1].innerHTML;
  description.value = selectedTask.children[2].innerHTML;

  deleteTasks(event);
}

/*
  This code adapts the idea from Joy Shaheb on FreeCodeCamp 
  with modification has been made into this code.
*/