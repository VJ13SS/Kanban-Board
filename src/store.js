import { create } from "zustand";

const store = (set) => ({
  //STATE
  sections: {
    ToDo: [],
    InProgress: [],
    Done: [],
  },
  addTaskPopUp: false,

  //ACTIONS
  toggleTaskPopup: () =>
    set((state) => ({ addTaskPopUp: !state.addTaskPopUp })),
  addNewSection: (newSection) =>
    set((state) => {
      const lastSection = state.sections["Done"];
      delete state.sections["Done"];
      return {
        sections: { ...state.sections, [newSection]: [], Done: lastSection },
      };
    }),
  addNewTask: (section, task) =>
    set((state) => ({
      sections: {
        ...state.sections,
        [section]: [...state.sections[section], task],
      },
      addTaskPopUp: !state.addTaskPopUp,
    })),
    deleteSection:(section) => ((state) => {
        console.log(state.sections)
        if(section === "ToDo" || section === "InProgress" || section === "Done"){
            alert(`Cannot delete the ${section} Section`)
            return
        }

        delete state.sections.section
    })
});

const useAppStore = create(store);

export default useAppStore;
