import { useEffect, useRef, useState } from "react";
import useAppStore from "../../stateManagement/store";
import "./board.css";
import Task from "../task/task";
import { MdMoreHoriz } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import AddTask from "../addTask/addTask";
import { Draggable, Droppable } from "react-beautiful-dnd";

export default function Board() {
  //STATE
  const [taskSection, setTaskSection] = useState("");
  const scrollRef = useRef(null);
  const sections = useAppStore((state) => state.sections);

  //ACTION
  const deleteSection = useAppStore((state) => state.deleteSection);
  const addTaskFlag = useAppStore((state) => state.addTaskPopUp);
  const toggleTaskPopup = useAppStore((state) => state.toggleTaskPopup);

  useEffect(() => {
    if (scrollRef.current) {
      const sectionElements = scrollRef.current.querySelectorAll(".section");

      const length = sectionElements.length;
      const secondLastSection = sectionElements[length - 2];

      //scroll to the second last section
      scrollRef.current.scrollTo({
        left: secondLastSection.offsetLeft,
        behavior: "smooth",
      });
    }
  }, [Object.keys(sections).length]);

  return (
    <main className="kanban-board" ref={scrollRef}>
      <div className="kanban-board__sections">
        {Object.entries(sections).map(([section, taskList], index) => (
          <Droppable droppableId={section.toString()}>
            {(provided) => (
              <div
                className="section"
                key={index}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <div className="section__header">
                  {section}
                  <div className="section__options">
                    <FiPlus
                      onClick={() => {
                        return [setTaskSection(section), toggleTaskPopup()];
                      }}
                    />
                    <div className="section__delete">
                      <MdMoreHoriz />
                      <div className="section__dropdown">
                        <span onClick={() => deleteSection(section)}>
                          Delete
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="section__tasks">
                  {taskList.map((task, indx) => (
                    <Draggable
                      draggableId={task.id.toString()}
                      index={indx}
                      key={task.id}
                    >
                      {(provided) => (
                        <Task
                          task={task}
                          taskSection={section}
                          provided={provided}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  {taskList.length == 0 &&
                  <span
                    onClick={() => {
                      return [setTaskSection(section), toggleTaskPopup()];
                    }}
                  >
                    + Add Task
                  </span>}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>

      {addTaskFlag && <AddTask taskSection={taskSection} />}
    </main>
  );
}
