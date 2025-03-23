document.getElementById('task-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const taskDescription = document.getElementById('task').value;
    const startTime = document.getElementById('start-time').value;
    const endTime = document.getElementById('end-time').value;

    if (!taskDescription || !startTime || !endTime) {
        alert('Please fill in all fields');
        return;
    }

    const newTask = {
        description: taskDescription,
        start: startTime,
        end: endTime
    };

    addTaskToDay(newTask);
    checkForCollisions(newTask);
});

function addTaskToDay(task) {
    // Assuming tasks are added to Monday for now, you can extend this
    const dayColumn = document.getElementById('monday');
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');
    taskDiv.textContent = `${task.description} (${task.start} - ${task.end})`;
    dayColumn.appendChild(taskDiv);
}

function checkForCollisions(newTask) {
    const dayColumn = document.getElementById('monday'); // Check Monday for now
    const existingTasks = dayColumn.getElementsByClassName('task');
    
    for (let task of existingTasks) {
        const taskTimes = task.textContent.match(/\(([^)]+)\)/)[1].split(' - ');
        const taskStart = taskTimes[0];
        const taskEnd = taskTimes[1];

        if (timeConflict(newTask.start, newTask.end, taskStart, taskEnd)) {
            showPopup();
            return;
        }
    }
}

function timeConflict(start1, end1, start2, end2) {
    return (start1 < end2 && start2 < end1); // Simple time conflict check
}

function showPopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'block';

    document.getElementById('close-popup').addEventListener('click', function() {
        popup.style.display = 'none';
    });
}
