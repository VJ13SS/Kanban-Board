import { MdDelete, MdEdit, MdMoreHoriz } from "react-icons/md";
import "./task.css";
import useAppStore from "../../stateManagement/store";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

export default function Task({ task, taskSection, index }) {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  //Function to Delete the respective Task
  const deleteTask = useAppStore((state) => state.deleteTask);
  const toggleTaskPopup = useAppStore((state) => state.toggleTaskPopup);

  //Functon to Format the Date
  const checkDate = (date) => {
    const today = new Date();
    const given = new Date(date);

    //Normalize to MidNight
    today.setHours(0, 0, 0, 0);
    given.setHours(0, 0, 0, 0);

    //calculate the difference in days
    const diffDays = (given - today) / (1000 * 60 * 60 * 24);

    if (diffDays === 1) return [diffDays, "Tomorrow"];
    if (diffDays === 0) return [diffDays, "Today"];
    if (diffDays === -1) return [diffDays, "Yesterday"];

    //Format date to dd-month fromat
    const formattedDate = { day: "numeric", month: "long" };

    return [diffDays, given.toLocaleDateString("en-GB", formattedDate)];
  };

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      column: taskSection,
      index: index,
      task: task,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        className="drag"
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
      ></div>
    );
  }

  return (
    <div
      className="task"
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      <div className="task__header">
        <p>{task.description}</p>
        <div className="task__menu">
          <MdMoreHoriz
            onClick={() => [
              setToggleDropdown((prev) => !prev),
              setTimeout(() => setToggleDropdown((prev) => false), 2500),
            ]}
          />
          {toggleDropdown && (
            <div
              className="task__dropdown"
              onClick={() => [setToggleDropdown((prev) => !prev),]}
            >
              <span onClick={() => toggleTaskPopup(taskSection, task)}>
                <MdEdit /> Edit
              </span>
              <span
                className="task__delete"
                onClick={() => deleteTask(taskSection, task.id)}
              >
                <MdDelete /> Delete
              </span>
            </div>
          )}
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
              checkDate(task.date)[0] === 0
                ? "today"
                : checkDate(task.date)[0] === 1
                ? "tomorrow"
                : checkDate(task.date)[0] < 0
                ? "before"
                : "other"
            }`}
          >
            {checkDate(task.date)[1]}
          </span>
        </div>

        <span className="task__category">{task.category}</span>
      </div>
    </div>
  );
}
