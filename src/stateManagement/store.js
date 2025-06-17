import { create } from "zustand";

//Defining the Store
const store = (set) => ({
  //STATE
  sections: {
    ToDo: [],
    InProgress: [],
    Done: [],
  },
  addTaskPopUp: false,//Flag to display the addTask Component

  //ACTIONS

  //Function to toggle the addTaskPopup Flad
  toggleTaskPopup: () =>
    set((state) => ({ addTaskPopUp: !state.addTaskPopUp })),

  //Function to add new section
  addNewSection: (newSection) =>
    set((state) => {

      //New Section is added before the Done section
      const lastSection = state.sections["Done"];
      delete state.sections["Done"];
      
      return {
        sections: { ...state.sections, [newSection]: [], Done: lastSection },
      };
    }),

  //Function to add new Task
  addNewTask: (section, task) =>
    set((state) => ({
      sections: {
        ...state.sections,
        [section]: [task,...state.sections[section]],
      },
      addTaskPopUp: !state.addTaskPopUp,
      
    })),

  //Function to delete a Section
  deleteSection: (section) => set((state) =>{
    if(section === 'ToDo' || section === 'InProgress' || section === 'Done'){
      alert(`Cannot Delete ${section} Section`)
      return state
    }

    if(confirm(`Do You Wish To Delete ${section} Section?`)){
      delete state.sections[section]
      return {sections:{...state.sections}}
    }
    return {sections:{...state.sections}}
  }),

  //Function to delete a Task
  deleteTask:(section,id) => set((state) => {
    if(confirm('Do You Wish To Delete The Following Task?')){

      //filter out the sections by removing the respective task
      return {
      sections:{...state.sections,[section]:state.sections[section].filter((task) => task.id !== id)}
    }
    }
    return {sections:{...state.sections}}
  }),

  //Function to modify the arrangement of tasks on each section upon drag
  modifySectionTasks:(sourceSection,sourceIndx,destinationSection,destinationIndx) => set((state) => {

    //get the current task which was dragged
    let currentTask = state.sections[sourceSection][sourceIndx]

    
    //delete the rescpective task from the source array
    state.sections[sourceSection].splice(sourceIndx,1)

    //add the task to the destination array
    state.sections[destinationSection].splice(destinationIndx,0,currentTask)
    return {
      sections:{...state.sections}
    }
  })
});

//creating the store
const useAppStore = create(store);

export default useAppStore;
