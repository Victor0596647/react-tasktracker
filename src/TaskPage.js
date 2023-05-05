import { useState } from "react";
import Tasks from "./Tasks.js";
import AddTask from "./AddTask.js";
import getRanHex from "./hexGen.js";
import Cookies from "js-cookie";

const TaskPage = () => {
  const [tasks, setTasks] = useState(Cookies.get('tasks') ? JSON.parse(Cookies.get('tasks')) : []);
  const [taskAdd, setAdd] = useState(false);

  const handleAdding = (title, desc, date) => {
    tasks.push({
      id: getRanHex(8),
      name: title,
      desc: desc,
      date: date,
    });
    console.log("New task created with id: " + tasks[tasks.length - 1].id);
    setAdd(false);
    addAnimation(taskAdd);
    formAnim(taskAdd);
    setTasks(tasks);
    Cookies.set('tasks', JSON.stringify(tasks), {expires: 5, path:'/'});
  };

  const handleDeleting = (taskid) => {
    console.log(`Deleting task id: ${taskid}`);
    //Cookies.remove('tasks');
    document.getElementById(`task-${taskid}`).animate([{opacity:"100%"}, {opacity:"0%"}], {duration:250, fill:"forwards", easing:"ease-in-out"}).finished.then(() => {
      document.getElementById(`task-${taskid}`).animate([{height:"156.16px", marginBottom:"10px"}, {height:"0px", marginBottom:"0px"}], {duration:250, fill:"forwards", easing:"ease-in-out"});
    });

    Cookies.set('tasks', JSON.stringify(tasks.filter((task) => {return task.id !== taskid;})), {expires: 5, path:'/'});
    console.log(JSON.parse(Cookies.get('tasks')));
  };

  // X animation
  /** @param {Boolean} addState */
  const addAnimation = (addState) => 
  {
    if(addState) document.getElementById("add-button").animate([{rotate:"45deg", transform: "translate(4px,-1px)", color:"red"}, {rotate:"0deg", transform:"translate(0px, 0px)", color:"black"}],{duration:200, fill:"both", easing:"ease-in"});
    else document.getElementById("add-button").animate([{rotate:"0deg", transform:"translate(0px, 0px)", color:"black"}, {rotate:"45deg", transform: "translate(4px,-1px)", color:"red"}],{duration:200, fill:"both", easing:"ease-out"});
  }

  // Form animation
  /**@param {Boolean} addState */
  const formAnim = (addState) =>
  {
    if(addState) {document.getElementById("addtask-container").animate([{opacity:"100%", height:"318px", padding:"10px"},{opacity:"0%", height:"0px", padding:"0px", display:"none"}], {duration:250, fill:"both", easing:"ease-out"}).finished.then(() => document.getElementById("addtask-container").style.display = "none") }
    else {document.getElementById("addtask-container").animate([{opacity:"0%", height:"0px", padding:"0px", display:"none"},{opacity:"100%", height:"318px", padding:"10px"}], {duration:250, fill:"both", easing:"ease-in"}); document.getElementById("addtask-container").style.display = "block";}
  }

  return (
    <div className="container">
      <div className="task-bar">
        <h1>Tasks</h1>
        <i onClick={() => { setAdd(!taskAdd); addAnimation(taskAdd); formAnim(taskAdd);}} className="bi bi-plus" id="add-button"></i>
      </div>
      <AddTask taskAdd={handleAdding} />
      <hr />
      <Tasks tasks={tasks} taskDelete={handleDeleting} />
    </div>
  );
};

export default TaskPage;
