import { useState } from "react";
import "./styles/addtask.css";

const AddTask = ({ taskAdd }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");

  return (
    <div className="addtask-container" id="addtask-container">
      <form
        className="addtask-form"
        onSubmit={(e) => {
          e.preventDefault();
          taskAdd(title, desc, date);
          //Reset
          setTitle("");
          setDesc("");
          setDate("");
        }}
      >
        <h2>Add a Task</h2>

        <label>Task Title</label>
        <input
          type="text"
          id="task-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <label>Task Description</label>
        <input
          type="text"
          id="task-desc"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <br />
        <label>Task Date</label>
        <input
          type="date"
          id="task-date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <br />
        <button
          id="submit-task"
          disabled={!(title !== "" && desc !== "" && date !== "")}
        >
          Create New Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
