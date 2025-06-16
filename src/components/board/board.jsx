import { useEffect, useRef, useState } from "react";
import useAppStore from "../../stateManagement/store";
import "./board.css";
import Task from "../task/task";
import { MdMoreHoriz } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import AddTask from "../addTask/addTask";
import { Draggable, Droppable } from "react-beautiful-dnd";

export default function Board() {
  const sections = useAppStore((state) => state.sections);
  const deleteSection = useAppStore((state) => state.deleteSection);
  const addTaskFlag = useAppStore((state) => state.addTaskPopUp);
  const toggleTaskPopup = useAppStore((state) => state.toggleTaskPopup);
  const [taskSection, setTaskSection] = useState("");
  const scrollRef = useRef(null)

  useEffect(() => {
    if(scrollRef.current){
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth
    }
  },[sections])
  
  return (
    <main className="kanban-board" ref={scrollRef}>
      
      <div className="kanban-board__sections" >
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
                    <Draggable draggableId={task.id.toString()} index={indx}>
                      {(provided) => (
                        <Task
                          key={task.id}
                          task={task}
                          taskSection={section}
                          provided={provided}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  <span
                    onClick={() => {
                      return [setTaskSection(section), toggleTaskPopup()];
                    }}
                  >
                    + Add Task
                  </span>
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
