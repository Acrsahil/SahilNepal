let taskIdCounter = 0;

document.addEventListener('DOMContentLoaded', (event) => {
    loadTasks('list-container-1');
    loadTasks('list-container-2');
    loadTasks('list-container-3');
});

function addTask(listContainerId, inputBoxId) {
    const inputBox = document.getElementById(inputBoxId);
    const listContainer = document.getElementById(listContainerId);
    const taskText = inputBox.value.trim();

    if (taskText !== "") {
        const listItem = document.createElement("li");
        listItem.textContent = taskText;
        listItem.id = `task-${taskIdCounter++}`;

        const crossButton = document.createElement("button");
        crossButton.textContent = "✖";
        crossButton.className = "cross-button";
        crossButton.onclick = function() {
            listContainer.removeChild(listItem);
            saveTasks(listContainerId);
        };

        listItem.appendChild(crossButton);
        listItem.addEventListener('click', function() {
            listItem.classList.toggle('checked');
            saveTasks(listContainerId);
        });

        listItem.setAttribute('draggable', true);
        listItem.addEventListener('dragstart', dragStart);
        listItem.addEventListener('dragover', dragOver);
        listItem.addEventListener('dragleave', dragLeave);
        listItem.addEventListener('drop', drop);
        listItem.addEventListener('dragend', dragEnd);

        listContainer.appendChild(listItem);
        inputBox.value = "";
        
        saveTasks(listContainerId);
    }
}

function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
    setTimeout(() => {
        event.target.classList.add('hide');
    }, 0);
}

function dragOver(event) {
    event.preventDefault();
    const target = event.target;
    if (target.tagName === 'LI') {
        target.classList.add('dragover');
    }
}

function dragLeave(event) {
    const target = event.target;
    if (target.tagName === 'LI') {
        target.classList.remove('dragover');
    }
}

function drop(event) {
    event.preventDefault();
    const id = event.dataTransfer.getData('text');
    const draggableElement = document.getElementById(id);
    const dropzone = event.target;

    if (dropzone.tagName === 'LI') {
        const bounding = dropzone.getBoundingClientRect();
        const offset = bounding.y + (bounding.height / 2);

        if (event.clientY - offset > 0) {
            dropzone.parentNode.insertBefore(draggableElement, dropzone.nextSibling);
        } else {
            dropzone.parentNode.insertBefore(draggableElement, dropzone);
        }
        dropzone.classList.remove('dragover');
    } else if (dropzone.tagName === 'UL') {
        dropzone.appendChild(draggableElement);
    }

    draggableElement.classList.remove('hide');
    saveTasks(dropzone.id);
}

function dragEnd(event) {
    event.target.classList.remove('hide');
}

function saveTasks(listContainerId) {
    const listContainer = document.getElementById(listContainerId);
    const tasks = listContainer.getElementsByTagName('li');
    const taskArray = [];

    for (let i = 0; i < tasks.length; i++) {
        const taskText = tasks[i].textContent.replace('✖', '').trim();
        const isChecked = tasks[i].classList.contains('checked');
        taskArray.push({ text: taskText, checked: isChecked });
    }

    localStorage.setItem(listContainerId, JSON.stringify(taskArray));
}

function loadTasks(listContainerId) {
    const listContainer = document.getElementById(listContainerId);
    const tasks = JSON.parse(localStorage.getItem(listContainerId)) || [];

    tasks.forEach(task => {
        const listItem = document.createElement("li");
        listItem.textContent = task.text;
        listItem.id = `task-${taskIdCounter++}`;
        if (task.checked) {
            listItem.classList.add('checked');
        }

        const crossButton = document.createElement("button");
        crossButton.textContent = "✖";
        crossButton.className = "cross-button";
        crossButton.onclick = function() {
            listContainer.removeChild(listItem);
            saveTasks(listContainerId);
        };

        listItem.appendChild(crossButton);
        listItem.addEventListener('click', function() {
            listItem.classList.toggle('checked');
            saveTasks(listContainerId);
        });

        listItem.setAttribute('draggable', true);
        listItem.addEventListener('dragstart', dragStart);
        listItem.addEventListener('dragover', dragOver);
        listItem.addEventListener('dragleave', dragLeave);
        listItem.addEventListener('drop', drop);
        listItem.addEventListener('dragend', dragEnd);

        listContainer.appendChild(listItem);
    });
}

document.getElementById('input-box-1').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask('list-container-1', 'input-box-1');
    }
});

document.getElementById('input-box-2').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask('list-container-2', 'input-box-2');
    }
});

document.getElementById('input-box-3').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask('list-container-3', 'input-box-3');
    }
});

document.getElementById('submit-button').addEventListener('click', function() {
    submitTasks('list-container-1');
    submitTasks('list-container-2');
    submitTasks('list-container-3');
});

function submitTasks(listContainerId) {
    const listContainer = document.getElementById(listContainerId);
    const tasks = listContainer.getElementsByTagName('li');
    const taskArray = [];

    for (let i = 0; i < tasks.length; i++) {
        const taskText = tasks[i].textContent.replace('✖', '').trim();
        const isChecked = tasks[i].classList.contains('checked');
        taskArray.push({ text: taskText, checked: isChecked });
    }

    console.log(`Tasks for ${listContainerId}:`, taskArray);
}
