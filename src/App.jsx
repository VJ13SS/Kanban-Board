import Header from "./components/header/header";
import Board from "./components/Board/board";
import useAppStore from "./stateManagement/store";
import AddTask from "./components/addTask/addTask";

export default function App() {
  const addTaskFlag = useAppStore((state) => state.addTaskPopUp);
  const addTaskSection = useAppStore((state) => state.addTaskSection);
  const editTask = useAppStore((state) => state.editTask);

  return (
    <div className="app">
      <Header />
      <Board />
      {addTaskFlag && <AddTask taskSection={addTaskSection} task={editTask} />}
    </div>
  );
}
