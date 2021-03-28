const todosWrapper = document.querySelector('.todos-wrapper');
const deskTaskInput = document.getElementById('exampleFormControlTextarea1');
const addTaskBtn = document.getElementById('add-task-btn');


let tasks = [];
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

let todoItemElems = [];

function Task(description) {
    this.description = description;
    this.completed = false;
}

const createTemplate = (task, index) => {
    return `
        <div class="shadow p-3 mb-5 bg-body rounded">

            <div class="todo-item ${task.completed ? 'checked' : ''}">

                <div class="description">
                    <input onclick="completeTask(${index})" class="form-check-input" type="checkbox" id="checkboxNoLabel"
                        value="" ${task.completed ? 'checked' : '' } aria-label="...">

                    ${task.description}

                </div>
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button onclick="deleteTask(${index})" class="btn btn-danger" type="button">Delete</button>
                </div>
            </div>

        </div>
                
        `
}

const filterTasks = () => {
    const activeTasks = tasks.length && tasks.filter(item => item.completed == false);
    const completedTasks = tasks.length && tasks.filter(item => item.completed == true);
    tasks = [...activeTasks, ...completedTasks];

}

const fillHtmlList = () => {
    todosWrapper.innerHTML = "";
    if (tasks.length > 0) {
        filterTasks();
        tasks.forEach((item, index) => {
            todosWrapper.innerHTML += createTemplate(item, index);

        });
        todoItemElems = document.querySelectorAll('.todo-item');
    }

}

fillHtmlList();

const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const completeTask = index => {
    console.log(index);
    tasks[index].completed = !tasks[index].completed;
    if (tasks[index].completed) {
        todoItemElems[index].classList.add('checked');
    } else {
        todoItemElems[index].classList.remove('checked')

    }
    updateLocal();
    fillHtmlList();
}

addTaskBtn.addEventListener('click', () => {
    tasks.push(new Task(deskTaskInput.value));
    updateLocal();
    fillHtmlList();
    deskTaskInput.value = '';


})

const deleteTask = index => {
    todoItemElems[index].classList.add('delition');
    setTimeout(() => {
        tasks.splice(index, 1);
        updateLocal();
        fillHtmlList();
    }, 500)
}
