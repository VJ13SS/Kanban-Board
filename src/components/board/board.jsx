import { useEffect, useRef, useState } from "react";
import useAppStore from "../../stateManagement/store";
import "./board.css";
import Task from "../task/task";
import { MdMoreHoriz } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import AddTask from "../addTask/addTask";
import { Draggable, Droppable } from "react-beautiful-dnd";
import AddSection from "../addSection/addSection";

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
    <main className="container">
      <div className="kanban-board" ref={scrollRef}>
        <div className="kanban-board__sections">
          {Object.entries(sections).map(([section, taskList], index) => (
            <div className="section" key={index}>
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

              <Droppable droppableId={section.toString()}>
                {(provided, snapshot) => (
                  <div
                    className={`section__tasks`}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {taskList.map((task, indx) => (
                      <div className="task-container">
                        <Draggable
                          draggableId={task.id.toString()}
                          index={indx}
                          key={task.id}
                        >
                          {(provided, snapshot) => (
                            <Task
                              task={task}
                              taskSection={section}
                              provided={provided}
                              snapshot={snapshot}
                            />
                          )}
                        </Draggable>
                      </div>
                    ))}

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
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>

        {addTaskFlag && <AddTask taskSection={taskSection} />}
      </div>
      <AddSection />
    </main>
  );
}
