const mainTododElem = document.querySelector(".todo-lists-elem");
const inputValue = document.querySelector("#inputValue");


const getTodoListsFromLocalStorage = () =>{
    return JSON.parse(localStorage.getItem('youtubeTodoList'));
};

const addTodoListLocalStorage = (localTodoLists) =>{
    return localStorage.setItem("youtubeTodoList", JSON.stringify(localTodoLists));
}

let localTodoLists = getTodoListsFromLocalStorage() || [];

const addTodoDynamicElement = (currElem) =>{
    const divElem = document.createElement("div");
    divElem.classList.add("main_todo_div");
    divElem.innerHTML = `<li>${currElem}</li>
            <button class="deleteBtn">Delete</button>`;
    mainTododElem.append(divElem);
}

const addTodoList = (e) => {
    
    if(inputValue.value!=""){
    e.preventDefault();
    const todoListValue = inputValue.value.trim();

    if(!localTodoLists.includes(todoListValue)){


    localTodoLists.push(todoListValue);
    localTodoLists = [...new Set(localTodoLists)];
    console.log(localTodoLists);
    localStorage.setItem('youtubeTodoList', JSON.stringify(localTodoLists));

    addTodoDynamicElement(todoListValue);
    }
    inputValue.value="";
    }
};

const showTodoList = () =>{
    console.log(localTodoLists);

    localTodoLists.forEach((currElem)=>{
        addTodoDynamicElement(currElem);
    })
}

showTodoList();

const removeTododElement = (e) =>{
    const todoToRemove=e.target;
    let todoListContent = todoToRemove.previousElementSibling.innerText;
    let parentElem = todoToRemove.parentElement;
    console.log(todoListContent);

    localTodoLists=localTodoLists.filter((curTodo)=>{
        return curTodo != todoListContent.toLowerCase;
    });
    addTodoListLocalStorage(localTodoLists);
    parentElem.remove();
    // console.log(localTodoLists);
}

mainTododElem.addEventListener('click', (e) =>{
    e.preventDefault();
    console.log(e.target.classList.contains("deleteBtn"));
    if(e.target.classList.contains("deleteBtn")){
        removeTododElement(e);
    }
});

document.querySelector(".btn").addEventListener('click', (e) =>{
    addTodoList(e);
});