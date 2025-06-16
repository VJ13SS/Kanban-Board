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
  deleteSection: (section) => set((state) =>{
    if(section === 'ToDo' || section === 'InProgress' || section === 'Done'){
      alert(`Cannot Delete ${section} Section`)
      return state
    }

    delete state.sections[section]
    confirm(`Do You Wish To Delete The ${section} Section?`)
    return {sections:{...state.sections}}
  }),
  deleteTask:(section,id) => set((state) => {
    return {
      sections:{...state.sections,[section]:state.sections[section].filter((task) => task.id !== id)}
    }
  }),
  modifySectionTasks:(sourceSection,sourceIndx,destinationSection,destinationIndx) => set((state) => {
    let currentTask = state.sections[sourceSection][sourceIndx]
    state.sections[sourceSection].splice(sourceIndx,1)
    state.sections[destinationSection].splice(destinationIndx,0,currentTask)
    
    return {
      sections:{...state.sections}
    }
  })
});

const useAppStore = create(store);

export default useAppStore;
