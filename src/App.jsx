import Header from "./components/header/header";
import Board from "./components/Board/board";

import useAppStore from "./stateManagement/store";

export default function App() {
  //Function to rearrange the tasks on each section
  const modifySectionTasks = useAppStore((state) => state.modifySectionTasks);

  //onDragEnd Function
  const onDragEnd = (result) => {
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
  };

  return (
    <div className="app">
      <Header />
      
        <Board />
     
    </div>
  );
}
