// Classes
//Task class
class Task {
    constructor(name, date, time) {
      this.name = name;
      this.date = date;
      this.time = time;
    }
  }

//UI Class
class UI {
  // Display the tasks in a list
  static displayTasks() {

    const tasks = Store.getTasks();

    tasks.forEach((task) => UI.addTaskToList(task));
  }

  // Add a task to the list
  static addTaskToList(task) {
    const list = document.getElementById('task-list');

    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${task.name}</td>
    <td>${task.date}</td>
    <td>${task.time}</td>
    <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;

    list.appendChild(row);
  }

  static deleteTask(element) {
    if (element.classList.contains('delete')) {
      element.parentElement.parentElement.remove();
    }
  }

  // Alert if fields aren't filled in
  static showAlert(message, classname) {
    const div = document.createElement('div');
    div.className = `alert alert-${classname}`;
    div.appendChild(document.createTextNode(message));

    const container = document.querySelector('.container');
    const form = document.querySelector('#task-form');
    container.insertBefore(div, form);

    // Hide alert after set time
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }
  
  // Clear all the fields in the input form
  static clearFields() {
    document.getElementById('name').value = '';
    document.getElementById('date').value = '';
    document.getElementById('time').value = '';
  }
}
       
//Store Class: Handles storage
class Store {

  static getTasks() {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    return tasks;
  }

  static addTask(task) {
    const tasks = Store.getTasks();

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  static removeTask(name) {
    const tasks = Store.getTasks();

    tasks.forEach((task, index) => {
      if (task.name === name) {
        tasks.splice(index, 1);
      }
    });
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}

// Functions

// Display Tasks
document.addEventListener('DOMContentLoaded', UI.displayTasks);


// Add a Task
document.getElementById('task-form').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault();
  // Get form values
  const name = document.getElementById('name').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;

  // Validation
  if (name === '' || date === '' || time === '') {
    UI.showAlert('Please fill in all fields', 'danger');
  } else {

    //Instatiate a task
    const task = new Task(name, date, time);
    console.log(task);

    //Add Task to UI
    UI.addTaskToList(task);

    //Add task to store
    Store.addTask(task);
    
    // Show a success message
    UI.showAlert('Task has been added!', 'success');

    //Clear fields
    UI.clearFields();
  }

});
        

//Remove a Task from list
document.getElementById('task-list').addEventListener('click', (e) => {
  // Remove a task from UI
  UI.deleteTask(e.target);

  //Remove a task from local storage
  Store.removeTask(e.target.
    parentElement.
    previousElementSibling.
    previousElementSibling.
    previousElementSibling.
    textContent);

  // Show a success message
  UI.showAlert('Task has been deleted', 'warning');
})