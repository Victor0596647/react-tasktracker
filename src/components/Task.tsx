import { BsTrash3Fill } from "react-icons/bs";
import { TaskObj } from "./taskReducer";

async function handleAnimation(
  e: React.MouseEvent<HTMLSpanElement>,
  taskV: TaskObj,
  handleDelete: (task: TaskObj) => void
) {
  const task = e.currentTarget.parentElement!;
  task
    .animate(
      [
        {
          transform: "scaleY(1)",
          opactiy: "100%",
        },
        {
          transform: "scaleY(0.2)",
          opacity: "0%",
        },
      ],
      {
        easing: "ease-in",
        duration: 250,
        fill: "forwards",
      }
    )
    .finished.then(() => {
      task
        .animate(
          [
            {
              height: "138.48px",
            },
            {
              height: "0px",
              padding: "0px",
              marginbottom: "0px",
            },
          ],
          {
            easing: "ease-in",
            duration: 150,
            fill: "forwards",
          }
        )
        .finished.then(() => {
          task.classList.toggle("deleted");
        })
        .finally(() => handleDelete(taskV));
    });
}

export function Task({
  taskList,
  handleDelete,
}: {
  taskList: TaskObj[];
  handleDelete: (task: TaskObj) => void;
}): React.ReactElement {
  return (
    <ul className="tasks">
      {taskList.map((v) => {
        return (
          <li className="task" key={v.id}>
            <div>
              <h2>{v.title}</h2>
              <h4 className="pl-4">{v.desc}</h4>
              <h4>
                {`${v.date.toLocaleDateString()}
                ${v.date.toLocaleTimeString().slice(0, v.date.toLocaleTimeString().lastIndexOf(':'))}
                ${v.date.toLocaleTimeString().split(" ")[1] ? v.date.toLocaleTimeString().split(" ")[1] : ''}`}
              </h4>
            </div>
            <span
              className="delete"
              onClick={(e) => {
                handleAnimation(e, v, handleDelete);
              }}
            >
              <BsTrash3Fill />
            </span>
          </li>
        );
      })}
    </ul>
  );
}
