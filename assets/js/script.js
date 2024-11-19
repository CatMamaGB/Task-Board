// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
    const id = nextId++;
    localStorage.setItem("nextId", JSON.stringify(nextId));
    return id;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskCard = $(`
        <div class="task-card" data-task-id="${task.id}">
            <h3>${task.title}</h3>
            <p>Due: ${dayjs(task.dueDate).format('MM/DD/YYYY')}</p>
            <button class="delete-task-btn">Delete</button>
        </div>
    `).draggable({
        revert: 'invalid',
    });
    return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    $('.task-card').draggable({
        revert: 'invalid',
        stack: '.task-card'
    });


}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {                                

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList();
});
