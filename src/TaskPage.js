import { useState } from "react";
import Tasks from "./Tasks.js";
import AddTask from "./AddTask.js";
import getRanHex from "./hexGen.js";

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
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
    {
      document.getElementById("add").style.transition = "transform 0.1s";
      document.getElementById("add").style.transform = "rotate(0deg)";
      document.getElementById("add").style.color = "black";
    }
    setTasks(tasks);
  };

  const handleDeleting = (taskid) => {
    console.log(`Deleting task id: ${taskid}`);
    setTasks(
      tasks.filter((task) => {
        return task.id !== taskid;
      })
    );
  };

  return (
    <div className="container">
      <div className="task-bar">
        <h1>Tasks</h1>
        <i
          onClick={() => {
            setAdd(!taskAdd);
            if (!taskAdd) {
              document.getElementById("add").style.transition =
                "transform 0.1s";
              document.getElementById("add").style.transform =
                "rotate(45deg) translate(4px,-1px)";
              document.getElementById("add").style.color = "red";
            } else {
              document.getElementById("add").style.transition =
                "transform 0.1s";
              document.getElementById("add").style.transform = "rotate(0deg)";
              document.getElementById("add").style.color = "black";
            }
          }}
          className="bi bi-plus"
          id="add"
        ></i>
      </div>
      {taskAdd && <AddTask taskAdd={handleAdding} />}
      <hr />
      <Tasks tasks={tasks} taskDelete={handleDeleting} />
    </div>
  );
};

export default TaskPage;
