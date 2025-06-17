import Header from "./components/header/header";
import Board from "./components/Board/board";
import { DragDropContext } from "react-beautiful-dnd";
import useAppStore from "./stateManagement/store";
import AddSection from "./components/addSection/addSection";

export default function App() {
  //Function to rearrange the tasks on each section
  const modifySectionTasks = useAppStore((state) => state.modifySectionTasks);

  //onDragEnd Function
  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId) return;

    modifySectionTasks(
      source.droppableId,
      source.index,
      destination.droppableId,
      destination.index
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="app">
        <Header />
        <AddSection />
        <Board />
      </div>
    </DragDropContext>
  );
}
