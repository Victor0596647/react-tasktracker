import React, { useCallback, useEffect, useReducer, useRef, useState } from "react";
import {BsPlus} from 'react-icons/bs'
import { Task } from "./Task";
import '../styles/task.css';
import { AddTask } from "./AddTask";
import { TaskObj, taskReducer } from "./taskReducer";

export function TaskLayout():React.ReactElement {
    const [taskState, taskDispatch] = useReducer(taskReducer, []);
    const [add, setAdd] = useState<boolean>(false);
    const plusRef = useRef<HTMLSpanElement>(null);

    useEffect(()=> {
        console.log(taskState);
    }, [taskState])

    const handleActive = useCallback(() => {
        if(plusRef.current)
            plusRef.current.classList.toggle('active');
            setAdd(!add);
        return
    }, [add])

    const handleDelete = useCallback((task: TaskObj) => {
        taskDispatch({type:'REMOVE', value:task})
    }, [taskState])

    const handleAdd = useCallback((task: TaskObj) => {
        taskDispatch({type:'ADD', value:task})
        handleActive();
        setAdd(false);
    }, [taskState])

    return (
        <div className="taskLayout">
            <div className="header">
                <h1>Tasks</h1>
                <span className="plus" ref={plusRef}><BsPlus onClick={() => {handleActive()}}/></span>
            </div>
            {
                add ? (<AddTask handleAdd={handleAdd} />) : null
            }
            <Task taskList={taskState} handleDelete={handleDelete}/>
        </div>
    )
}
