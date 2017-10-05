window.onload = function () {
    var addTodoInput = document.getElementById('addTodoInput');
    addTodoInput.addEventListener('keydown', inputEnterPressHandle);
    loadBodyHandle();
};

function loadBodyHandle() {
    var todoList = getAlltodo();
    makeTodoList(todoList);
}

function makeTodoList(array) {
    createTodoListIfNotExist();
    console.log(array);
    var list = document.getElementById('todoList');
    for (var i = 0; i < array.length; i++) {
        if(array[i].isClosed == true){
            continue;
        }
        var item = createListItem(array[i].id);
        var button = createDeleteButton(array[i].id);
        var label = createLabelWithText(array[i].name);
        item.appendChild(button);
        item.appendChild(label);
        list.appendChild(item);
    }
    return list;
}

function createListItem(id) {
    var item = document.createElement('li');
    item.id = id;
    item.className = 'form-horizontal list-group-item';
    item.style.width = '300px';
    return item;
}

function createDeleteButton(id) {
    var button = document.createElement('button');
    button.id = id;
    button.textContent = 'del';
    button.whiteSpace = 'normal';
    button.className = 'btn-primary btn-xs';
    button.style.float = 'right';
    button.onclick = onClickButton;
    return button;
}

function createLabelWithText(text) {
    var label = document.createElement('label');
    label.className = 'col-1';
    label.appendChild(document.createTextNode(text));
    return label
}

function createTodoListIfNotExist() {
    if (!document.getElementById('todoList')) {
        var res = document.createElement('UL');
        res.className = 'list-group';
        res.id = 'todoList';
        document.getElementById("todoListHolder").appendChild(res);
    }
}

//listeners
function inputEnterPressHandle(event) {
    if (event.keyCode == 13) {
        var input = event.target;
        addTodo(input.value);
        input.value = "";
    }
}

function onClickButton(button) {
    var isDeleted = deleteRequest(button.target.id);
    if (isDeleted) {
        //document.getElementById('todoList').removeChild(document.getElementById(button.target.id));
        document.getElementById(button.target.id).className += ' disabled';
    }
}


//api methods
function deleteRequest(id) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("post", "http://localhost:1113/todo/close/" + id, false); // false for synchronous request
    xmlHttp.send(null);
    if (xmlHttp.status == 200) {
        return true;
    }
    return false;
}

function getAlltodo() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "http://localhost:1113/todo", false); // false for synchronous request
    xmlHttp.send(null);
    return JSON.parse(xmlHttp.responseText)
}

function addTodo(value) {
    var request = new XMLHttpRequest();
    request.open('POST', "http://localhost:1113/todo", false);
    var params = JSON.stringify({
        name: value,
        time: "test"
    });

    request.setRequestHeader("Content-Type", "application/json");
    request.send(params);
    var res = request.responseText;

    if (request.status == 200) {
        var paramsArray = JSON.stringify([{
            name: value,
            time: "test",
            id: res
        }]);
        paramsArray = JSON.parse(paramsArray);
        makeTodoList(paramsArray);

    }

}