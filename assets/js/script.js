// Initialize taskList and nextId if they don't exist in localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;

function generateTaskId() {
    const id = nextId;
    nextId++;
    localStorage.setItem("nextId", JSON.stringify(nextId));
    return id;
}

function createTaskCard(task) {
    const taskColor = task.dueDate && dayjs(task.dueDate) < dayjs() ? 'bg-danger' : 
                     task.dueDate && dayjs(task.dueDate).diff(dayjs(), 'day') <= 2 ? 'bg-warning' : 'bg-light';
    
    return $(`<div class="card task-card mb-3 ${taskColor}" data-task-id="${task.id}">
        <div class="card-body">
            <h5 class="card-title">${task.title}</h5>
            <p class="card-text">${task.description}</p>
            <p class="card-text"><small>Due: ${dayjs(task.dueDate).format('MM/DD/YYYY')}</small></p>
            <button class="btn btn-danger delete-task">Delete</button>
        </div>
    </div>`);
}

function renderTaskList() {
    $('#todo-cards, #in-progress-cards, #done-cards').empty();
    
    taskList.forEach(task => {
        const taskCard = createTaskCard(task);
        $(`#${task.status}-cards`).append(taskCard);
    });
    
    $('.task-card').draggable({
        revert: 'invalid',
        stack: '.task-card'
    });
}

function handleAddTask(event) {
    event.preventDefault();
    
    const task = {
        id: generateTaskId(),
        title: $('#task-title').val(),
        description: $('#task-description').val(),
        dueDate: $('#task-due-date').val(),
        status: 'todo'
    };
    
    taskList.push(task);
    localStorage.setItem("tasks", JSON.stringify(taskList));
    
    // Close modal and reset form
    $('#formModal').modal('hide');
    $(event.target).trigger('reset');
    
    renderTaskList();
}

function handleDeleteTask(event) {
    const taskId = $(event.target).closest('.task-card').data('task-id');
    taskList = taskList.filter(task => task.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderTaskList();
}

function handleDrop(event, ui) {
    const taskId = ui.draggable.data('task-id');
    const newStatus = $(event.target).closest('.lane').attr('id');
    
    const taskIndex = taskList.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        taskList[taskIndex].status = newStatus;
        localStorage.setItem("tasks", JSON.stringify(taskList));
        renderTaskList();
    }
}

$(document).ready(function () {
    // Make lanes droppable
    $('.lane').droppable({
        accept: '.task-card',
        drop: handleDrop
    });
    
    // Initialize date picker
    $('#task-due-date').datepicker();
    
    // Add event listeners
    $(document).on('submit', '#task-form', handleAddTask);
    $(document).on('click', '.delete-task', handleDeleteTask);
    
    // Initial render
    renderTaskList();
});
