import { MdMoreHoriz } from "react-icons/md";
import "./task.css";

export default function Task({ task }) {
  return (
    <div className="task">
      <div className="task__header">
        <p>{task.task}</p>
        <MdMoreHoriz />
      </div>
      <div className="task__footer">
        <div className="task__info">
        <img src="vite.svg" alt="Photo of assigned user." />
        <span className="">Date</span>
        </div>
        
      <span className="task__category">Category</span>
      </div>
      
    </div>
  );
}
