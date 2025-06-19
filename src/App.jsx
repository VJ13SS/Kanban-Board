import Header from "./components/header/header";
import Board from "./components/Board/board";

import useAppStore from "./stateManagement/store";
import { closestCorners, DndContext } from "@dnd-kit/core";

export default function App() {
  //Function to rearrange the tasks on each section
  const modifySectionTasks = useAppStore((state) => state.modifySectionTasks);

  //onDragEnd Function
  /*const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    modifySectionTasks(
      source.droppableId,
      source.index,
      destination.droppableId,
      destination.index
    );
  };*/

  const onDragEnd = (event) => {
    const { active, over } = event;
    console.log('End',active,over)
    //console.log(active.data.current, over.data.current);
    modifySectionTasks(active, over)
  };

  const onDragMove = (event) => {
    const { active, over } = event;

    console.log('Move',active, over);
  };

  return (
    <div className="app">
      <Header />
      <DndContext onDragEnd={onDragEnd} onDragMove={onDragMove} collisionDetection={closestCorners}>
        <Board />
     </DndContext>
    </div>
  );
}
