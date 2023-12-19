import React, { useCallback, useEffect, useRef, useState } from "react";
import {BsPlus} from 'react-icons/bs'
import { Task } from "./Task";
import { getRanHex } from "./hexGen";

import '../styles/task.css';
import { AddTask } from "./AddTask";

export type TaskObj = {
    id: string,
    title: string,
    desc: string,
    date: Date
}

export function TaskLayout():React.ReactElement {
    const [taskList, setTaskList] = useState<TaskObj[]>([]);
    const [add, setAdd] = useState<boolean>(false);
    const plusRef = useRef<HTMLSpanElement>(null);

    useEffect(()=> {
    }, [JSON.stringify(taskList)])

    const handleActive = useCallback(() => {
        if(plusRef.current) 
            plusRef.current.classList.toggle('active');
            setAdd(!add);
        return
    }, [add])

    const handleDelete = useCallback((id: string) => {
        setTaskList(taskList.filter((t) => {return id !== t.id}));
    }, [taskList])

    const handleAdd = useCallback((title:string, desc:string, date:Date) => {
        taskList.push({id:getRanHex(8), title:title, desc:desc, date:date});
        setTaskList(taskList);
        handleActive();
        setAdd(false);
    }, [taskList])

    return (
        <div className="taskLayout">
            <div className="header">
                <h1>Tasks</h1>
                <span className="plus" ref={plusRef}><BsPlus onClick={() => {handleActive()}}/></span>
            </div>
            {
                add ? (<AddTask handleAdd={handleAdd} />) : null
            }
            <Task taskList={taskList} handleDelete={handleDelete}/>
        </div>
    )
}