import { MdMoreHoriz } from "react-icons/md";
import "./task.css";
import { useState } from "react";
import useAppStore from "../../stateManagement/store";

export default function Task({ task, taskSection, provided }) {
  //Function to Delete the respective Task
  const deleteTask = useAppStore((state) => state.deleteTask);

  //Functon to Format the Date
  const checkDate = (date) => {
    const today = new Date();
    const given = new Date(date);

    //Normalize to MidNight
    today.setHours(0, 0, 0, 0);
    given.setHours(0, 0, 0, 0);

    //calculate the difference in days
    const diffDays = (given - today) / (1000 * 60 * 60 * 24);

    if (diffDays === 1) return "Tomorrow";
    if (diffDays === 0) return "Today";
    if (diffDays === -1) return "Yesterday";

    //Format date to dd-month fromat
    const formattedDate = { day: "numeric", month: "long" };

    return given.toLocaleDateString("en-GB", formattedDate);
  };

  return (
    <div
      className="task"
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      
    >
      <div className="task__header">
        <p>{task.description}</p>
        <div className="task__menu">
          <MdMoreHoriz />
          <div className="task__dropdown">
            <span
              className="task__delete"
              onClick={() => deleteTask(taskSection, task.id)}
            >
              Delete
            </span>
          </div>
        </div>
      </div>
      
      <div className="task__footer">
        <div className="task__info">
          <img
            src={URL.createObjectURL(task.userImg)}
            alt="Photo of assigned user."
          />
          <span
            className={`${
              checkDate(task.date) === "Today"
                ? "today"
                : checkDate(task.date) === "Tomorrow"
                ? "tomorrow"
                : checkDate(task.date) === "Yesterday"
                ? "yesterday"
                : ""
            }`}
          >
            {checkDate(task.date)}
          </span>
        </div>

        <span className="task__category">{task.category}</span>
      </div>
    </div>
  );
}
