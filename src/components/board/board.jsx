import { useEffect, useRef, useState } from "react";
import useAppStore from "../../stateManagement/store";
import "./board.css";
import AddSection from "../addSection/addSection";
import Section from "../section/section";
import {
  closestCorners,
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Task from "../task/task";

export default function Board() {
  //STATE
  const scrollRef = useRef(null);
  const sections = useAppStore((state) => state.sections);
  const [activeTask, setActiveTask] = useState(null);

  //ACTIONS

  const modifySectionTasks = useAppStore((state) => state.modifySectionTasks); //Function to rearrange the tasks on each section

  const onDragEnd = (event) => {
    const { active, over } = event;
    setActiveTask(null);
    modifySectionTasks(active, over);
  };

  const onDragStart = (event) => {
    const { active, over } = event;
    setActiveTask(active.data.current);
  };

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        delay: 200, //only drag if pressed for 200ms
        tolerance: 5, //or moved at least 5px
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

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
    <DndContext
      onDragEnd={onDragEnd}
      collisionDetection={closestCorners}
      onDragStart={onDragStart}
      sensors={sensors}
    >
      <main className="container">
        <div className="kanban-board" ref={scrollRef}>
          <div className="kanban-board__sections">
            {Object.entries(sections).map(([section, taskList], index) => (
              <Section key={section} taskList={taskList} section={section} />
            ))}
          </div>
        </div>

        <AddSection />
      </main>

      <DragOverlay>
        {activeTask ? (
          <Task
            task={activeTask.task}
            taskSection={activeTask.column}
            index={activeTask.index}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
