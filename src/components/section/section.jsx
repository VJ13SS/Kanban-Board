import { useDroppable } from "@dnd-kit/core";
import Task from "../task/task";
import {
  SortableContext,
} from "@dnd-kit/sortable";
import { MdMoreHoriz } from "react-icons/md";
import { FiPlus } from "react-icons/fi";


export default function Section({
  id,
  taskList,
  section,
  setTaskSection,
  toggleTaskPopup,
  deleteSection,
}) {
  const { setNodeRef } = useDroppable({ id:section });
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
              return [setTaskSection(section), toggleTaskPopup()];
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
        <SortableContext items={taskList.map(item => item.id)}>
        {taskList.map((task, indx) => (
          <Task task={task} taskSection={section} key={indx} index={indx}/>
        ))}
        </SortableContext>

        {taskList.length == 0 && (
          <span
            className="section__add-task"
            onClick={() => {
              return [setTaskSection(section), toggleTaskPopup()];
            }}
          >
            + Add Task
          </span>
        )}
      </div>
    </div>
  );
}
