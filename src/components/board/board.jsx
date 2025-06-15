import { useState } from "react";
import useAppStore from "../../store";
import "./board.css";
import Task from "../task/task";
import { MdMoreHoriz } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import AddTask from "../addTask/addTask";

export default function Board() {
  const sections = useAppStore((state) => state.sections);
  const addnewSection = useAppStore((state) => state.addNewSection);
  const  deleteSection= useAppStore((state) => state.deleteSection);
  const addTaskFlag = useAppStore((state) => state.addTaskPopUp);
  const toggleTaskPopup = useAppStore((state) => state.toggleTaskPopup);
  const [taskSection, setTaskSection] = useState("");
  return (
    <main className="kanban-board">
      {Object.entries(sections).map(([section, taskList], index) => (
        <div className="section" key={index}>
          <div className="section__header">
            {section}
            <div className="section__options">
              <FiPlus
                onClick={() => {
                  return [setTaskSection(section), toggleTaskPopup()];
                }}
              />
              <MdMoreHoriz onClick={deleteSection(section)}/>
            </div>
          </div>

          <div className="section__tasks">
            {taskList.map((task, indx) => (
              <Task key={indx} task={task} />
            ))}
            <span
              onClick={() => {
                return [setTaskSection(section), toggleTaskPopup()];
              }}
            >
              + Add Task
            </span>
          </div>
        </div>
      ))}
      <button onClick={() => addnewSection("uyis")}>
        <FiPlus /> Add Section
      </button>

      {addTaskFlag && <AddTask taskSection={taskSection} />}
    </main>
  );
}
