import { useEffect, useState } from "react";
import "./addTask.css";
import { MdAdd, MdClose } from "react-icons/md";
import useAppStore from "../../stateManagement/store";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

export default function AddTask({ taskSection, task }) {
  //STATE
  const [userImg, setUserImg] = useState(false);
  const [newTask, setNewTask] = useState({});

  //ACTIONS
  const toggleTaskPopup = useAppStore((state) => state.toggleTaskPopup);

  
  const addNewTask = useAppStore((state) => state.addNewTask);
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!userImg) {
      toast.error('Upload User Image')
      return
    }
    else{
      
    addNewTask(taskSection, {
      ...newTask,
      userImg: userImg,
      id: newTask.id ? newTask.id : uuidv4(),
    });
    }
    
  };

  useEffect(() => {
    if (Object.keys(task).length > 0) {
      setNewTask(task);
      setUserImg(task.userImg)
    }
  }, []);

  return (
    <div className="add-task">
      <form onSubmit={onSubmitHandler}>
        <h1>Add Something New</h1>

        <label>Section: </label>
        <input type="text" name='taskSection'  value={taskSection} readOnly />

        <label>Task Name / Category: </label>
        <input
          type="text"
          name="category"
          placeholder="Programming"
          required
          onChange={(e) =>
            setNewTask((prev) => ({ ...prev, [e.target.name]: e.target.value }))
          }
          value={newTask["category"]}
        />

        <label>Descritpion: </label>
        <input
          type="text"
          placeholder="Fixing Bugs"
          name="description"
          required
          onChange={(e) =>
            setNewTask((prev) => ({ ...prev, [e.target.name]: e.target.value }))
          }
          value={newTask["description"]}
        />

        <label>Due Date: </label>
        <input
          type="date"
          name="date"
          required
          onChange={(e) =>
            setNewTask((prev) => ({ ...prev, [e.target.name]: e.target.value }))
          }
          value={newTask["date"]}
        />

        <label htmlFor="userImg" className="add-task__user">
          <span>Upload Assignee Image: </span>
          <figure>
            <img
              src={userImg ? URL.createObjectURL(userImg) : "/upload_area.png"}
              alt="The Image of User assigned with the task."
            />
          </figure>
        </label>
        <input
          type="file"
          accept="image/*"
          name=""
          id="userImg"
          hidden
          onChange={(e) => setUserImg(e.target.files[0])}

        />

        <div className="buttons">
          <button onClick={toggleTaskPopup} className="cancel-button">Cancel</button>
          <button type="submit">Add Task</button>
        </div>
        
      </form>
    </div>
  );
}
