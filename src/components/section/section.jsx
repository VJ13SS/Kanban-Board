import { useDroppable } from "@dnd-kit/core";
import Task from "../task/task";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { MdMoreHoriz } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import "./section.css";
import useAppStore from "../../stateManagement/store";
import { useState } from "react";

export default function Section({ taskList, section }) {
  //STATE
  const [toggleDeletePopup, setToggleDeletePopup] = useState(false);

  //ACTIONS
  const { setNodeRef } = useDroppable({ id: section }); //node ref for each droppable section
  const deleteSection = useAppStore((state) => state.deleteSection); //ACTION to delete a section
  const toggleTaskPopup = useAppStore((state) => state.toggleTaskPopup); //ACTION to toggle task popup
  

  console.log(toggleDeletePopup);
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
              return toggleTaskPopup(section, {});
            }}
          />
          <div className="section__delete">
            <MdMoreHoriz
              onClick={() => setToggleDeletePopup((prev) => !prev)}
            />
            {toggleDeletePopup && (
              <div className="section__dropdown">
                <span
                  onClick={() => [
                    setToggleDeletePopup((prev) => !prev),
                    deleteSection(section),
                  ]}
                >
                  Delete
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="section__tasks">
        <SortableContext
          items={taskList.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          {taskList.map((task, indx) => (
            <>
              <Task task={task} taskSection={section} key={indx} index={indx} />
            </>
          ))}
        </SortableContext>

        {taskList.length == 0 && (
          <button
            className="section__add-task"
            onClick={() => {
              return toggleTaskPopup(section, {});
            }}
          >
            + Add Task
          </button>
        )}
      </div>
    </div>
  );
}
