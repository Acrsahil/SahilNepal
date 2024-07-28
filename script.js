let taskIdCounter = 0;

function addTask(listContainerId, inputBoxId) {
    // Get the input box and list container elements
    const inputBox = document.getElementById(inputBoxId);
    const listContainer = document.getElementById(listContainerId);
    
    // Get the value from the input box
    const taskText = inputBox.value.trim();
    
    // Check if the input box is not empty
    if (taskText !== "") {
        // Create a new list item
        const listItem = document.createElement("li");
        
        // Add the task text to the list item
        listItem.textContent = taskText;
        
        // Assign a unique id to the list item
        listItem.id = `task-${taskIdCounter++}`;

        // Create the cross button
        const crossButton = document.createElement("button");
        crossButton.textContent = "✖";
        crossButton.className = "cross-button";
        crossButton.onclick = function() {
            listContainer.removeChild(listItem);
        };
        
        // Append the cross button to the list item
        listItem.appendChild(crossButton);

        // Add event listener to toggle checked state
        listItem.addEventListener('click', function() {
            listItem.classList.toggle('checked');
        });
        
        // Set draggable attribute and add drag event listeners
        listItem.setAttribute('draggable', true);
        listItem.addEventListener('dragstart', dragStart);
        listItem.addEventListener('dragover', dragOver);
        listItem.addEventListener('dragleave', dragLeave);
        listItem.addEventListener('drop', drop);
        listItem.addEventListener('dragend', dragEnd);
        
        // Append the new list item to the list container
        listContainer.appendChild(listItem);
        
        // Clear the input box
        inputBox.value = "";
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
    
    // Ensure dropzone is a list item before inserting
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
}

function dragEnd(event) {
    event.target.classList.remove('hide');
}

// Add event listeners to handle the Enter key for each input box
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
    // Here you can implement logic to save tasks to a server or local storage
}

// Add event listener to the submit button
document.getElementById('submit-button').addEventListener('click', function() {
    submitTasks('list-container-1');
    submitTasks('list-container-2');
    submitTasks('list-container-3');
});
