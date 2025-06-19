import { useEffect, useState } from "react";
import "./addTask.css";
import { MdClose } from "react-icons/md";
import useAppStore from "../../stateManagement/store";
import { v4 as uuidv4 } from "uuid";

export default function AddTask({ taskSection, task }) {
  //STATE
  const [userImg, setUserImg] = useState(false);
  const [newTask, setNewTask] = useState({});

  //ACTIONS
  const toggleTaskPopup = useAppStore((state) => state.toggleTaskPopup);
  const addNewTask = useAppStore((state) => state.addNewTask);
  const onSubmitHandler = (e) => {
    if (!userImg) {
      alert("Please Insert Attendee userImg..!");
      return;
    }
    e.preventDefault();
    addNewTask(taskSection, {
      ...newTask,
      userImg: userImg,
      id: newTask.id ? newTask.id : uuidv4(),
    });
  };

  useEffect(() => {
    if (Object.keys(task).length > 0) {
      setNewTask(task);
    }
  }, []);

  return (
    <div className="add-task">
      <form onSubmit={onSubmitHandler}>
        <MdClose className="close-icon" onClick={toggleTaskPopup} />

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
          required
          hidden
          onChange={(e) => setUserImg(e.target.files[0])}
        />

        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}
