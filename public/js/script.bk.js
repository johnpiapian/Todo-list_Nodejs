// Array to hold tasks
var tasks = [];

// Task status 'enum'
var taskStatus = {
  active: 'active',
  completed: 'completed'
};

// Task constructor function
function Task(id, name, status) {
  this.id = id;
  this.name = name;
  this.status = status;
}

// Creates a new task element and adds it to the DOM
function addTaskElement(task) {
  //Get a reference to the active list
  var listEl = document.getElementById('active-list');

  //Create elements
  var taskEl = document.createElement('li');
  var textEl = document.createTextNode(task.name);

  //Add text to task element
  taskEl.appendChild(textEl);

  //Add task element to list
  listEl.appendChild(taskEl);
}


// Click handler to add a new task
function addTask(event) {
  var inputEl = document.getElementById('input-task');
  if (inputEl.value !== '') {
    //Create a unique id
    var id = 'item-' + tasks.length;

    //Create a new task
    var task = new Task(id, inputEl.value, taskStatus.active);
    tasks.push(task);

    //Add the task to the DOM
    addTaskElement(task);

    //Reset input
    inputEl.value = '';
  }
}

//Finding corresponding task in tasks array and update the status
function completeTask(event) {
  //Get the task element
  var taskEl = event.target;
  if(taskEl.tagName.toLowerCase() === 'li'){
    var id = taskEl.id;
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      if (task.id === id) {
        task.status = taskStatus.completed;
        break;
      }
    }
    //Move task element from active list to completed list
    taskEl.remove();
    document.getElementById('completed-list').appendChild(taskEl);
  }
}

//Click handler to undo completed task
function undoCompletedTask(event){
  //Get the task element
  var taskEl = event.target
  if(taskEl.tagName.toLowerCase() === 'li'){
    var id = taskEl.id;
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      if (task.id === id) {
        task.status = taskStatus.active;
        break;
      }
    }
    //Move task element from completed list to active list
    taskEl.remove();
    document.getElementById('active-list').appendChild(taskEl);
  }
}

//Key press handler to automatically click the addd task button
function clickButton(event) {
  if (event.keyCode === 13) {
    document.getElementById('add-task').click();
  }
}

//Initializes the app
function init() {
  //Wire up the add task buttton click handler
  document.getElementById('add-task').onclick = addTask;

  //Wire up the task completed list item click handler
  document.getElementById('active-list').onclick = completeTask;

  //Wire up undo the task completed list item click handler
  document.getElementById('completed-list').onclick = undoCompletedTask;

  //Wire up the task input keypress handler
  document.getElementById('input-task').onkeypress = clickButton;
  
}

init();