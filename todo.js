const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

var toDos = [];

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo) {
        return toDo !== $(li).children("span")[0].innerHTML; // id 없애고 값만 비교해서 삭제
    });

    toDos = cleanToDos;
    saveToDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function askForDel(btn) {
    const result = confirm("삭제하시겠습니까 ?")

    if(result) {
        deleteToDo(btn);
    }
}

function paintToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");

    delBtn.classList.add('btn')
    delBtn.addEventListener("click", askForDel);

    span.innerText = text;
    span.style.paddingLeft = "10px";
    span.addEventListener("dblclick", changeList);

    li.appendChild(delBtn);
    li.appendChild(span);

    toDoList.appendChild(li);

    const toDoObj = text;

    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo);
        });
    }
}

function changeList(){
    const beforeContent = event.target.innerHTML;
    const afterContent = prompt("바꿀 내용을 입력하세요",event.target.innerHTML);
    event.target.innerHTML = afterContent;
    toDos.splice(toDos.indexOf(beforeContent),1,afterContent);

    saveToDos();
}


function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();