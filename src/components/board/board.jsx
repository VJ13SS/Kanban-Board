import { useEffect, useRef, useState } from "react";
import useAppStore from "../../stateManagement/store";
import "./board.css";
import Task from "../task/task";
import { MdMoreHoriz } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import AddTask from "../addTask/addTask";
import AddSection from "../addSection/addSection";
import { closestCorners, DndContext } from "@dnd-kit/core";
import Section from "../section/section";

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

  const onDragEnd = (event) => {
    const { active, over } = event;

    console.log(active, over);
  };

  return (
    <main className="container">
      <div className="kanban-board" ref={scrollRef}>
        
          <div className="kanban-board__sections">
            {Object.entries(sections).map(([section, taskList], index) => (
              <Section
                key={section}
                id={section}
                taskList={taskList}
                section={section}
                setTaskSection={setTaskSection}
                toggleTaskPopup={toggleTaskPopup}
                deleteSection={deleteSection}
              />
            ))}
          </div>
       

        {addTaskFlag && <AddTask taskSection={taskSection} />}
      </div>

      <AddSection />
    </main>
  );
}
