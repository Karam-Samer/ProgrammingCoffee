function addTask(inputValue, data, id) {
    let liEle = document.createElement("li");
    liEle.className = "list-group-item d-flex mb-2";
    liEle.dataset.task = id;
    liEle.innerHTML = `
    <div class="row w-100">
        <div class="col-8 col-md-10 overflow-x-auto"><span>${inputValue}</span></div>
        <div class="col-4 col-md-2">
            <div class="row">
                <div class="col-6">
                    <span class="correct rounded-circle text-primary" onclick="doneTask(this)"><i class="fa-solid fa-circle-check"></i></span>
                </div>
                <div class="col-6">
                    <span class="delete rounded-circle text-danger" onclick="deleteTask(this)"><i class="fa-solid fa-x"></i></span>
                </div>
            </div>
        </div>
    </div>
    `;
    data.appendChild(liEle);
    updateTasksInLocalStorage();
}

function checkTasks() {
    allTasks = JSON.parse(localStorage.getItem("allTasks")) || [];
    let taskCount = allTasks.filter(task => task.status === "todo").length;
    let doneCount = allTasks.filter(task => task.status === "done").length;

    if (taskCount === 0) {
        listAlert.classList.remove("d-none");
        listAlert.textContent = "No tasks added yet!";
    } else {
        listAlert.classList.add("d-none");
    }
    if (doneCount === 0) {
        doneAlert.classList.remove("d-none");
        doneAlert.textContent = "No tasks completed yet!";
    } else {
        doneAlert.classList.add("d-none");
    }

}

function updateTasksInLocalStorage() {
    allTasks = [];
    document.querySelectorAll("#TodoList li .col-8.col-md-10").forEach(li => {
        allTasks.push({
            id: li.closest("li").dataset.task,
            text: li.textContent.trim(),
            status: "todo"
        });
    });
    document.querySelectorAll("#DoneList li .col-8.col-md-10").forEach(li => {
        allTasks.push({
            id: li.closest("li").dataset.task,
            text: li.textContent.trim(),
            status: "done"
        });
    });
    localStorage.setItem("allTasks", JSON.stringify(allTasks));
}

function showAllTasks(data, place) {
    place.innerHTML = "";
    data.forEach(function (item, index) {
        addTask(item, place, index);
    });

}

function deleteTask(that) {
    if (!confirm("Are you sure you want to delete this task?")) {
        return;
    }
    that.closest("li").remove();
    updateTasksInLocalStorage();
    checkTasks();
}

function doneTask(that) {
    let li = that.closest("li");
    if (!confirm("Are you sure you want to mark this task as done?")) {
        return;
    }
    that.remove();
    correctEle.appendChild(li);

    li.style.textDecoration = "line-through"
    setTimeout(() => {
        li.style.textDecoration = "none";
    }, 1000);
    updateTasksInLocalStorage();

    checkTasks();
}
