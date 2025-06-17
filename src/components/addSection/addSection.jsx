import { useState } from "react";
import useAppStore from "../../stateManagement/store";
import { FiPlus } from "react-icons/fi";
import "./addSection.css";

export default function AddSection() {
  //STATE
  const [newSection, setNewSection] = useState("");
  const [toggleInput,setToggleInput] = useState(false)

  //ACTION
  const addnewSection = useAppStore((state) => state.addNewSection);
  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (newSection.trim() === "") return;
    addnewSection(newSection.trim());
    
    setNewSection("");
    setToggleInput(false)
  };

  return (
    <form className="add-new-section" onSubmit={(e) => onSubmitHandler(e)}>
      
      <button type="submit" onClick={() => (setToggleInput(true))}>
        <FiPlus size={15} /> Add Section
      </button>
      {toggleInput &&
      <input
        type="text"
        onChange={(e) => setNewSection(e.target.value)}
        value={newSection}
        placeholder="Eg: Reviews"
        required
      />}
    </form>
  );
}
