import Header from "./components/header/header";
import Board from "./components/Board/board";
import useAppStore from "./stateManagement/store";
import {
  closestCorners,
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import AddTask from "./components/addTask/addTask";
import { useState } from "react";
import Task from "./components/task/task";

export default function App() {
  //STATE
  const [activeTask, setActiveTask] = useState(null);

  const addTaskFlag = useAppStore((state) => state.addTaskPopUp);
  const addTaskSection = useAppStore((state) => state.addTaskSection);
  const editTask = useAppStore((state) => state.editTask);

  //ACTIONS
  //Function to rearrange the tasks on each section
  const modifySectionTasks = useAppStore((state) => state.modifySectionTasks);

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

  return (
    <div className="app">
      <Header />
      <DndContext
        onDragEnd={onDragEnd}
        collisionDetection={closestCorners}
        onDragStart={onDragStart}
        sensors={sensors}
      >
        <Board />
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
      {addTaskFlag && <AddTask taskSection={addTaskSection} task={editTask} />}
    </div>
  );
}
