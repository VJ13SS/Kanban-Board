import { MdMoreHoriz } from "react-icons/md";
import "./task.css";
import { useState } from "react";
import useAppStore from "../../store";

export default function Task({ task,taskSection,provided }) {

  const deleteTask = useAppStore((state) => state.deleteTask)

  return (
    <div className="task" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
      <div className="task__header">
        <p>{task.description}</p>
        <div className="task__menu">
        <MdMoreHoriz />
           <div className="task__dropdown">
        <span className="task__delete" onClick={()=> deleteTask(taskSection,task.id)}>Delete</span>
      </div>
      </div>
      </div>
      <div className="task__footer">
        <div className="task__info">
        <img src={URL.createObjectURL(task.userImg)} alt="Photo of assigned user." />
        <span className="">{task.date}</span>
        </div>
        
      <span className="task__category">{task.category}</span>
      </div>


    </div>
  );
}
