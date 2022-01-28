
var taskInput=document.getElementById("new-task");
var addButton=document.getElementsByTagName("button")[0];
var incompleteTaskHolder=document.getElementById("incomplete-tasks");
var completedTasksHolder=document.getElementById("completed-tasks");

//New task
var createNewTaskElement=function(taskName){

	var listItem=document.createElement("li");
	var checkBox=document.createElement("input");
	var label=document.createElement("label");
	var editInput=document.createElement("input");
	var editButton=document.createElement("button");
	var deleteButton=document.createElement("button");

	label.innerText=taskName;

	checkBox.type="checkbox";
	editInput.type="text";
	editButton.innerText="Edit";
	editButton.className="edit";
	deleteButton.innerText="Delete";
	deleteButton.className="delete";

	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);

	return listItem;
}

//Add task
var addTask=function(){
    if(taskInput.value !== "")
	{
        var listItem=createNewTaskElement(taskInput.value);
        
        incompleteTaskHolder.appendChild(listItem);
        bindTaskEvents(listItem, taskCompleted);
        
        taskInput.value="";
        alert("Your task added successfully ");

    } else {

    }

}

//Edit task.
var editTask=function(){

    var listItem=this.parentNode;
    var editInput=listItem.querySelector('input[type=text]');
    var label=listItem.querySelector("label");
    var containsClass=listItem.classList.contains("editMode");
            
        if(containsClass)
        {
            label.innerText=editInput.value;

        } else {

            editInput.value=label.innerText;
        }

        listItem.classList.toggle("editMode");
}

//Delete task.
var deleteTask=function(){
    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    ul.removeChild(listItem);

}

//On checked task completed
var taskCompleted=function(){
	var listItem=this.parentNode;
	completedTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskIncomplete);

}

var taskIncomplete=function(){
	var listItem=this.parentNode;
	incompleteTaskHolder.appendChild(listItem);
	bindTaskEvents(listItem,taskCompleted);
}

//Onclick add task
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);

//Bind all
var bindTaskEvents=function(taskListItem,checkBoxEventHandler){

	var checkBox=taskListItem.querySelector("input[type=checkbox]");
	var editButton=taskListItem.querySelector("button.edit");
	var deleteButton=taskListItem.querySelector("button.delete");

        editButton.onclick=editTask;
        deleteButton.onclick=deleteTask;
        checkBox.onchange=checkBoxEventHandler;
}

//list item
for (let i=0; i<incompleteTaskHolder.children.length;i++)
{
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}

for (let i=0; i<completedTasksHolder.children.length;i++)
{
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}