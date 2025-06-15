import { useState } from 'react'
import useStore from '../../store'
import './board.css'
import Task from '../task/task'
import { MdMoreHoriz } from 'react-icons/md'
import { FiPlus } from 'react-icons/fi'

export default function Board(){

    const sections = useStore((state) => state.sections)
    const addnewSection = useStore((state) => state.addNewSection)
    const [newSection,setNewSection] = useState('')
    const [newTask,setNewTask] = useState({})

    console.log(sections)

    return(
        <main className='kanban-board'>
            {Object.entries(sections).map(([section,taskList],index) => (
                <div className='section' key={index}>
                    <div className='section__header'>
                        {section}
                        <div className="section__options">
                        
                            <FiPlus />
                            <MdMoreHoriz />
                        </div>
                    </div>
                    
                    <div className="section__tasks">
                        {taskList.map((task,indx) => (
                            <Task key={indx} task={task}/>
                        ))}
                        <span>+ Add Task</span>
                    </div>
                    
                    
                </div>
            ))}
            <button onClick={()=>addnewSection('uyis')}><FiPlus /> Add Section</button>

            
        </main>
    )
}