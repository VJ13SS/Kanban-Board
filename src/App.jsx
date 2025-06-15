import { useEffect } from "react";
import { useState } from "react";
import Header from "./components/header/header";
import Board from "./components/Board/board";

export default function App() {
  const tasks = {
    toDo: [
      {
        id: "1",
        task: "A",
      },
      {
        id: "2",
        task: "B",
      },
    ],
    inProgress: [
      {
        id: "3",
        task: "C",
      },
      {
        id: "4",
        task: "D",
      },
    ],
    done: [
      {
        id: "5",
        task: "E",
      },
      {
        id: "6",
        task: "F",
      },
    ],
  };

  
  const [entries,setEntries] = useState(tasks)
 
  const [sectionName,setSectionName] = useState('')
  const [newTask,setNewTask] = useState('')

  const onClickHandler = () => {
    console.log(sectionName)
    setEntries((prev) => ({...prev,[sectionName]:[]})) 
    setSectionName('')
  }

  const addTask = (entry) => {
    console.log(entries[entry])
    setEntries((prev) =>({...prev,[entry]:[...prev[entry],{id:'24',task:newTask}]}))
    
  }

  useEffect(()=>{
    console.log('Added')
  },[entries])

  return (
    <div className="app">
      <Header />
      <Board />
    </div>
  );
}
