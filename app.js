  //Define UI Variables

  const form = document.querySelector('#task-form');
  const taskList = document.querySelector('.collection');
  const clearButton = document.querySelector('.clear-tasks');
  const filter = document.querySelector('#filter');
  const taskInput = document.querySelector('#task');

  //Load All event lister
  loadAllEventListner();

  // create all event listner

  function loadAllEventListner() {
      document.addEventListener('DOMContentLoaded', getTask)
      form.addEventListener('submit', addTask);
      taskList.addEventListener('click', removeTask);
      clearButton.addEventListener('click', clearTask);
      filter.addEventListener('keyup', filterTask);

  }

  //Get task from local stora
  function getTask() {
      if (localStorage.getItem('tasks') === null) {
          tasks = [];
      } else {
          tasks = JSON.parse(localStorage.getItem('tasks'));
      }

      tasks.forEach(function(task) {
          const li = document.createElement('li');

          // add class in li
          li.className = 'collection-item';

          //append text in li
          li.appendChild(document.createTextNode(task));

          // create <a> link item
          const link = document.createElement('a');

          // add class in link
          link.className = 'delete-item secondary-content';

          // icon in link
          link.innerHTML = '<i class="fa fa-remove"></i>';

          //append link in list
          li.appendChild(link);

          //append list in ul
          taskList.appendChild(li);

      })


  }

  function addTask(e) {

      if (taskInput.value === '') {
          alert('Add task');
      } else {
          // create new li
          const li = document.createElement('li');

          // add class in li
          li.className = 'collection-item';

          //append text in li
          li.appendChild(document.createTextNode(taskInput.value));

          // create <a> link item
          const link = document.createElement('a');

          // add class in link
          link.className = 'delete-item secondary-content';

          // icon in link
          link.innerHTML = '<i class="fa fa-remove"></i>';

          //append link in list
          li.appendChild(link);

          //append list in ul
          taskList.appendChild(li);

          //store task in local storage
          storeTaskLocalStorage(taskInput.value);



          //clear task input
          taskInput.value = '';

      }

      e.preventDefault();
  }


  // local storage 
  function storeTaskLocalStorage(task) {
      let tasks;
      if (localStorage.getItem('tasks') === null) {
          tasks = [];
      } else {
          tasks = JSON.parse(localStorage.getItem('tasks'));
      }

      tasks.push(task);

      localStorage.setItem('tasks', JSON.stringify(tasks));

  }

  // Remove task

  function removeTask(e) {
      if (e.target.parentElement.classList.contains('delete-item')) {
          if (confirm('Are you sure')) {
              e.target.parentElement.parentElement.remove();

              // Remove from LS
              removeTaskFromLocalStorage(e.target.parentElement.parentElement);
          }
      }

  };

  //remove from Ls
  function removeTaskFromLocalStorage(taskItem) {
      let tasks;
      if (localStorage.getItem('tasks') === null) {
          tasks = [];
      } else {
          tasks = JSON.parse(localStorage.getItem('tasks'));
      }

      tasks.forEach(function(task, index) {
          if (taskItem.textContent === task) {
              tasks.splice(index, 1);
          }


      });

      localStorage.setItem('tasks', JSON.stringify(tasks));
  }



  //Clear Task
  function clearTask() {

      if (confirm('This will clear all task')) {
          while (taskList.firstChild) {
              taskList.removeChild(taskList.firstChild);
          }
          clearTaskFromLs()
      }

  };



  //clear task from ls
  function clearTaskFromLs() {
      localStorage.clear();

  }

  //Filter Task keyup

  function filterTask(e) {
      //taken value
      const text = e.target.value.toLowerCase();

      //for each 
      document.querySelectorAll('.collection-item').forEach(function(task) {

          const item = task.firstChild.textContent;

          if (item.toLowerCase().indexOf(text) != -1) {

              task.style.display = 'block';
          } else {
              task.style.display = 'none';
          }

      });

  };