import { useDroppable } from "@dnd-kit/core";
import Task from "../task/task";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { MdMoreHoriz } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import "./section.css";
import useAppStore from "../../stateManagement/store";
import { useState } from "react";

export default function Section({ taskList, section}) {
  const { setNodeRef } = useDroppable({ id: section });
  const deleteSection = useAppStore((state) => state.deleteSection);
  const toggleTaskPopup = useAppStore((state) => state.toggleTaskPopup);
  const [taskSection, setTaskSection] = useState("");
  const [over,setOver] = useState({})
  const [active,setActive] = useState({})

  console.log(over)
  return (
    <div className="section" ref={setNodeRef}>
      <div className="section__header">
        <span>
          {section === "ToDo"
            ? "To Do"
            : section === "InProgress"
            ? "In Progress"
            : section}
        </span>
        <div className="section__options">
          <FiPlus
            onClick={() => {
              return toggleTaskPopup(section,{});
            }}
          />
          <div className="section__delete">
            <MdMoreHoriz />
            <div className="section__dropdown">
              <span onClick={() => deleteSection(section)}>Delete</span>
            </div>
          </div>
        </div>
      </div>

      <div className="section__tasks">
        <SortableContext items={taskList.map((item) => item.id)} strategy={verticalListSortingStrategy}>
          {taskList.map((task, indx) => (
               <Task task={task} taskSection={section} key={indx} index={indx} setOver={setOver} setActive={setActive}/>
      
          ))}
        </SortableContext>

        {taskList.length == 0 && (
          <button
            className="section__add-task"
            onClick={() => {
              return toggleTaskPopup(section,{});
            }}
          >
            + Add Task
          </button>
        )}
      </div>

      
    </div>
  );
}
