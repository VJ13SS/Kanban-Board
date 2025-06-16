import { useState } from "react";
import useAppStore from "../../stateManagement/store";
import { FiPlus } from "react-icons/fi";
import './addSection.css'

export default function AddSection(){
    const [newSection, setNewSection] = useState("");
     const addnewSection = useAppStore((state) => state.addNewSection);
     const onSubmitHandler = (e) => {
        e.preventDefault();
        if(newSection.trim() === "") return
        addnewSection(newSection.trim());
        setNewSection("");
      };

    return(
        <form
          className="add-new-section"
          onSubmit={(e) => onSubmitHandler(e)}
        >
          <input
            type="text"
            onChange={(e) => setNewSection(e.target.value)}
            value={newSection}
            placeholder="Eg: Reviews"
            required
          />
          <button>
            <FiPlus /> Add Section
          </button>
        </form>
    )
}