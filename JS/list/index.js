let formEle = document.querySelector("form"),
    inputEle = formEle.querySelector("input"),
    ulEle = document.querySelector("#TodoList"),
    correctEle = document.querySelector("#DoneList"),
    listAlert = document.querySelector(".tasks .alert"),
    doneAlert = document.querySelector("#BoxModal .modal-body .alert"),
    allTasks = [],
    Id = 0;

InsideHtmlNavEditor();
ball();
checkTasks();

(function () {
    if (localStorage.getItem("allTasks") === null) {
        localStorage.setItem("allTasks", JSON.stringify(allTasks));
    }
    else {
        let storedTasks = JSON.parse(localStorage.getItem("allTasks"));
        storedTasks.forEach(task => {
            if (task.status === "todo") {
                addTask(task.text, ulEle, task.id);
            }
            else {
                addTask(task.text, correctEle, task.id);
            }
            Id = Math.max(Id, task.id + 1);
        });
        checkTasks();
    }
})();

formEle.addEventListener("submit", (e) => {
    e.preventDefault();
    let inputValue = inputEle.value.trim();

    if (inputValue == "") {
        listAlert.classList.remove("d-none");
        listAlert.textContent = "Please enter a task!";
        return;
    }

    addTask(inputValue, ulEle, Id++);
    checkTasks();
    inputEle.value = "";
    updateTasksInLocalStorage();
});

