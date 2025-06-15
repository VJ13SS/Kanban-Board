import { create } from "zustand"

const store = (set) => ({
    //STATE
    sections:{
        ToDo:[{id:'1',task:'A'},{id:'2',task:'B'}],
        InProgress:[{id:'1',task:'A'},{id:'2',task:'B'}],
        Done:[{id:'1',task:'A'},{id:'2',task:'B'}],
    },

    //ACTIONS
    addNewSection:(newSection) => set((state) => {
        const lastSection = state.sections['Done']
        delete state.sections['Done']
        return(
            {sections:{...state.sections,[newSection]:[],Done:lastSection}}
        )
    }),
    addNewTask:(section,task) => set((state) => ({sections:{...state.sections,[section]:[...state.sections.section,task]}}))
    
})

const useStore = create(store)

export default useStore