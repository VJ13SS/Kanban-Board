import Header from "./components/header/header";
import Board from "./components/Board/board";
import { DragDropContext } from "react-beautiful-dnd";
import useAppStore from "./store";

export default function App() {

  const modifySectionTasks = useAppStore((state) => state.modifySectionTasks)
  const sections = useAppStore((state) => state.sections)
  console.log(sections)
  const onDragEnd = (result) => {
    const {source,destination} = result

    if(!destination) return

    if(destination.droppableId === source.droppableId && source.index === destination.index) return
    console.log(result)
    modifySectionTasks(source.droppableId,source.index,destination.droppableId,destination.index)

  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="app">
      <Header />
      <Board />
    </div>
    </DragDropContext>
    
  );
}
