import { useState } from "react";
import "./addTask.css";
import { MdClose } from "react-icons/md";
import useAppStore from "../../store";
import {v4 as uuidv4} from 'uuid'


export default function AddTask({ taskSection }) {
  const [image, setImage] = useState(false);
  const toggleTaskPopup = useAppStore((state) => state.toggleTaskPopup);
  const addNewTask = useAppStore((state) => state.addNewTask);
  const [newTask,setNewTask] = useState({})
  const onSubmitHandler = (e) => {
    e.preventDefault()
    addNewTask(taskSection,{...newTask,userImg:image,id:uuidv4()})
  }
  return (
    <div className="add-task">
      <form onSubmit={onSubmitHandler}>
        <MdClose className="close-icon" onClick={toggleTaskPopup} />
        <label>Section: </label>
        <input type="text" value={taskSection} />
        <label>Task Category: </label>
        <input
          type="text"
          name="category"
          placeholder="Programming"
          required
          onChange={(e) =>
            setNewTask((prev) => ({ ...prev, [e.target.name]: e.target.value }))
          }
        />

        <label>Descritpion: </label>
        <textarea
          placeholder="Fixing Bugs"
          name="description"
          rows={1}
          cols={26}
          required
          onChange={(e) =>
            setNewTask((prev) => ({ ...prev, [e.target.name]: e.target.value }))
          }
        />

        <label>Due Date: </label>
        <input
          type="date"
          name="date"
          required
          onChange={(e) =>
            setNewTask((prev) => ({ ...prev, [e.target.name]: e.target.value }))
          }
        />

        <label htmlFor="userImg" className="add-task__user">
          <span>Upload User Image: </span>
          <figure>
            <img
              src={image ? URL.createObjectURL(image) : "/upload_area.png"}
              alt="The Image Of User Uploaded will appear here."
            />
          </figure>
        </label>
        <input
          type="file"
          accept="image/*"
          name=""
          id="userImg"
          required
          hidden
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}
