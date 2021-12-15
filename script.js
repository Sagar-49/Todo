function showTask() {
    let datas = localStorage.getItem("todoList");
    if (datas) {
        let tempDatas = JSON.parse(datas);
        tempDatas.forEach(item => {
            let createList = document.createElement("li");
            createList.classList.add("tasks-list");
            createList.setAttribute("id", item.id);
            let addList = `
                <div class="list">
                <div class="texts">
                    <div class="title">${item.name}</div>
                    <div class="importance">${item.importance}</div>
                </div>
                <div class="buttons">
                    <input type="checkbox" name="check" id="check" onclick="statusChange(${item.id})" class="checked" ${item.completed ? `checked` : ''}>
                    <button class="delete" id="delete_bt" onclick="deleteTask(${item.id})"><i class="fas fa-trash-alt"></i></button>
                </div>
                </div>
            `
            createList.innerHTML = addList;
            let parentNode = document.getElementById("tasks-wrapper");
            parentNode.prepend(createList);
        });
    }
}

function deleteTask(id) {
    let element = document.getElementById(id);
    element.remove();
    let tempData = JSON.parse(localStorage.getItem("todoList"));
    let tempDataIndex = tempData.findIndex((item) => item.id == id);
    tempData.splice(tempDataIndex, 1);
    localStorage.setItem("todoList", JSON.stringify(tempData));
}

function statusChange(id) {
    let tempData = JSON.parse(localStorage.getItem("todoList"));
    let tempDataIndex = tempData.findIndex((item) => item.id == id);
    tempData[tempDataIndex]['completed'] = !tempData[tempDataIndex]['completed'];
    localStorage.setItem("todoList", JSON.stringify(tempData));
}

function add() {
    let task_name = document.getElementById("addtask").value;
    let error_ta = document.getElementById("todoerror");
    let priority_selected = document.getElementById("priority").value;
    let error_priority = document.getElementById("priorityerror");

    if (task_name.length == 0 || priority_selected === 'importance') {
        if (task_name.trim().length == 0) {
            error_ta.innerText = "Please fill task name";
        }
        else {
            error_ta.innerText = "";
        }
        if (priority_selected === 'importance') {
            error_priority.innerText = "Please select priority";
        }
        else {
            error_priority.innerText = "";
        }
        return;
    }
    else {
        error_ta.innerText = "";
        error_priority.innerText = "";
        addToList(task_name, priority_selected);
    }
}
function clearForm() {
    let task_name = document.getElementById("addtask");
    let priority_selected = document.getElementById("priority");
    task_name.value = "";
    priority_selected.value = 'importance';
}

function addToList(name, importance, completed = false) {
    let createList = document.createElement("li");
    createList.classList.add("tasks-list");
    createList.setAttribute("id", Date.now());
    let addList = `
    <div class="list">
      <div class="texts">
        <div class="title">${name}</div>
        <div class="importance">${importance}</div>
      </div>
      <div class="buttons">
        <input type="checkbox" name="check" id="check" onclick="statusChange(${Date.now()})" class="checked" ${completed ? `checked` : ''}>
        <button class="delete" id="delete_bt" onclick="deleteTask(${Date.now()})"><i class="fas fa-trash-alt"></i></button>
      </div>
    </div>
  `
    createList.innerHTML = addList;
    let parentNode = document.getElementById("tasks-wrapper");
    parentNode.prepend(createList);
    let tempData = localStorage.getItem("todoList");
    let getData = [];
    if (tempData) {
        getData = JSON.parse(tempData);
    }
    let tempObject = {
        id: Date.now(),
        name: name,
        importance: importance,
        completed: false
    };
    getData = [tempObject, ...getData];
    localStorage.setItem("todoList", JSON.stringify(getData));
    clearForm();
}

function allData() {
    let parentNode = document.getElementById("tasks-wrapper");
    parentNode.innerHTML = "";
    showTask();
}

function getStatusWiseData(status) {
    let datas = localStorage.getItem("todoList");
    let parentNode = document.getElementById("tasks-wrapper");
    parentNode.innerHTML = "";
    if (datas) {
        let tempDatas = JSON.parse(datas);
        tempDatas.forEach(item => {
            if (item.completed == status) {
                let createList = document.createElement("li");
                createList.classList.add("tasks-list");
                createList.setAttribute("id", item.id);
                let addList = `
                <div class="list">
                <div class="texts">
                    <div class="title">${item.name}</div>
                    <div class="importance">${item.importance}</div>
                </div>
                <div class="buttons">
                    <input type="checkbox" name="check" id="check" onclick="statusChange(${item.id})" class="checked" ${item.completed ? `checked` : ''}>
                    <button class="delete" id="delete_bt" onclick="deleteTask(${item.id})"><i class="fas fa-trash-alt"></i></button>
                </div>
                </div>
            `
                createList.innerHTML = addList;
                let parentNode = document.getElementById("tasks-wrapper");
                parentNode.prepend(createList);
            }
        });
    }
}

function closeAll() {
    localStorage.removeItem("todoList");
    let parentNode = document.getElementById("tasks-wrapper");
    parentNode.innerHTML = "";
    showTask();
}

