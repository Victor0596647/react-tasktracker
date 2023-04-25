const Tasks = ({ tasks, taskDelete }) => {
  return (
    <div className="taskLists">
      {tasks.map((task) => (
        <div className="task-container" key={task.id}>
          <div className="taskData">
            <h2>{task.name}</h2>
            <p>{task.desc}</p>
            <h5>{task.date}</h5>
          </div>
          <i
            className="bi bi-trash-fill"
            onClick={() => taskDelete(task.id)}
          ></i>
        </div>
      ))}
    </div>
  );
};

export default Tasks;
