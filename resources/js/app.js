/* EXTRA */

/* EXERCISE 5: 
                Add a new task to the list.
                Suggestion:
                - Use document.getElementById to get the UL item and the input text
                - Use the document.createElement to create the new List Item
                - Append the child to the UL
            */

const addTaskBtn = document.getElementById("add-task-btn")
const addTaskInput = document.getElementById("new-task")
const taskListUl = document.getElementById("task-list")
const colorPickerCurrent = document.getElementById("color-current")

const addNewTask = () => {
  // For sorting purposes
  const newTaskContent = addTaskInput.value
  // For assigning a color to a new task
  const newTaskColor = colorPickerCurrent.value

  // Using helper function to create new li
  createNewLi(newTaskContent, newTaskColor)

  // Resetting the input
  addTaskInput.value = ""
}
addTaskBtn.addEventListener("click", addNewTask)

/* EXERCISE 6: 
                Create a method "removeLast" which removes the last item from the task list
            */

const removeLastBtn = document.getElementById("remove-last-btn")

const removeLast = () => {
  // Removing last child of ul
  const lastTask = taskListUl.lastChild
  taskListUl.removeChild(lastTask)
}
removeLastBtn.addEventListener("click", removeLast)

/* EXERCISE 7: 
                Create a method "removeFirst" which removes the first item from the task list
            */

const removeFirstBtn = document.getElementById("remove-first-btn")

const removeFirst = () => {
  // Removing first child of ul
  const firstTask = taskListUl.firstChild
  taskListUl.removeChild(firstTask)
}
removeFirstBtn.addEventListener("click", removeFirst)

/*
EXTRA:
Method "removeTask" to remove any task
*/

// Event handler for removing any task once its remove btn is clicked
const removeTask = (event) => {
  // Getting clicked btn
  const currentBtn = event.currentTarget
  // Getting its parent (which will be the li)
  const parentLi = currentBtn.parentElement
  // Removing that li from ul
  taskListUl.removeChild(parentLi)
}

/* EXERCISE 8: 
               Create a method "getTasksAsArray" which returns, and prints to the console an array containing the tasks as string
            */

const printTasksBtn = document.getElementById("print-array-btn")

const getTasksAsArray = () => {
  const tasksArray = [...taskListUl.childNodes].map((task) => ({
    color: task.style.backgroundColor,
    text: task.innerText,
  }))
  console.log(tasksArray)
  return tasksArray
}
printTasksBtn.addEventListener("click", getTasksAsArray)

/* EXERCISE 9:
               Create a method "changeTaskBackgroundColor" which takes the color from the color picker with an 
               onchange event listener ad applies it as background to every list item
            */

const colorPickerAll = document.getElementById("color-all")

const changeTaskBackgroundColor = () => {
  const color = colorPickerAll.value
  const tasks = taskListUl.childNodes
  tasks.forEach((task) => {
    task.style.backgroundColor = color
  })
}
colorPickerAll.addEventListener("change", changeTaskBackgroundColor)

/* EXERCISE 10: 
               Create a method "bubbleSort()" which sort the task list alphabetically using the bubble sort algorithm
            
               Use your spare time to beautify your task list via CSS.

               Suggestion:
               - Break the code into many function for semplicity 
               - Reuse the functions previously created
            */

const sortBtn = document.getElementById("sort-btn")

const bubbleSort = () => {
  const sortedTasks = getTasksAsArray().sort((a, b) =>
    a.text.toLowerCase() > b.text.toLowerCase()
      ? 1
      : a.text.toLowerCase() < b.text.toLowerCase()
      ? -1
      : 0
  )
  console.log(sortedTasks)
  taskListUl.innerHTML = ""
  sortedTasks.forEach((task) => {
    // const li = `<li style="background-color:${task.color}"><img src="./resources/images/removeBtn.jpeg"/>${task.text}</li>`
    //addNewTask(task)
    // taskListUl.innerHTML += li

    createNewLi(task.text, task.color)
  })
}
sortBtn.addEventListener("click", bubbleSort)

/*
===========================
HELPER FUNCTIONS
===========================
*/
// Helper function to add remove btn to each task
const addRemoveBtn = () => {
  // For each task I'm adding an img that will work as btn
  // and once clicked will remove that task
  const newRemoveBtn = document.createElement("img")
  // Adding a class to the remove btns so I can target them later
  newRemoveBtn.classList.add("remove-btn")
  // Specifying the src for the img
  newRemoveBtn.src = "./resources/images/removeBtn.jpeg"
  // Adding an event listener to the remove btn
  newRemoveBtn.addEventListener("click", removeTask)
  return newRemoveBtn
}

// Helper function to create new li element
const createNewLi = (text, color) => {
  // Create new li
  const newLiElement = document.createElement("li")
  // Get li content from input
  newLiElement.innerText = text
  // Get bg color from color picker
  newLiElement.style.backgroundColor = color

  // Using helper function to add remove btn
  newLiElement.prepend(addRemoveBtn())

  // Appending the neely created li to the ul
  taskListUl.appendChild(newLiElement)
}
