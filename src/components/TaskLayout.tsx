import React, { useCallback, useEffect, useReducer, useRef } from "react";
import {BsPlus} from 'react-icons/bs'
import { Task } from "./Task";
import '../styles/task.css';
import { AddTask } from "./AddTask";
import { TaskObj, formTaskReducer, taskReducer } from "./taskReducer";

export function TaskLayout():React.ReactElement {
    const [taskState, taskDispatch] = useReducer(taskReducer, []);
    const [formState, formDispatch] = useReducer(formTaskReducer, {visible:false, finished: true});
    const plusRef = useRef<HTMLSpanElement>(null);

    useEffect(()=> {
        console.log(taskState);
    }, [taskState])

    useEffect(()=> {
        const formE = document.querySelector('.addTask') as HTMLDivElement;
        switch(formState.anim_type){
            case "open":
                formDispatch({ type:"VISIBILITY", value:true });
                formE.animate(
                    [
                        {
                            opacity: 0,
                        },
                        {
                            opacity: 100
                        }
                    ] as React.CSSProperties[] as Keyframe[],
                    {
                        fill:'forwards',
                        duration:150,
                        easing:'ease-in'
                    }
                ).finished.finally(() => {
                    formDispatch({ type: "NONE"});
                })
                return
            case "close":
                formE.animate(
                    [
                        {
                            opacity: 100,
                        },
                        {
                            opacity: 0,
                        }
                    ] as React.CSSProperties[] as Keyframe[],
                    {
                        fill:'forwards',
                        duration:150,
                        easing:'ease-out'
                    }
                ).finished.finally(() => {
                    formDispatch({ type:"VISIBILITY", value:false });
                    formDispatch({ type: "NONE"});
                    (document.querySelector(".addTask form") as HTMLFormElement).reset();
                })
                return
            case undefined:
                return
        }
    }, [formState.anim_type])

    const handleActive = useCallback(() => {
        if(plusRef.current && formState.finished){
            plusRef.current.classList.toggle('active');
            formDispatch({ type:(formState.visible ? "CLOSE" : "OPEN") });
        }
        return;
    }, [formState])

    const handleDelete = useCallback((task: TaskObj) => {
        taskDispatch({type:'REMOVE', value:task})
    }, [taskState])

    const handleAdd = useCallback((task: TaskObj) => {
        taskDispatch({type:'ADD', value:task});
        handleActive();
    }, [taskState, formState])

    return (
        <div className="taskLayout">
            <div className="header">
                <h1>Tasks</h1>
                <span className="plus" ref={plusRef}><BsPlus onClick={() => {handleActive()}}/></span>
            </div>
            <AddTask handleAdd={handleAdd} visible={formState.visible} />
            <Task taskList={taskState} handleDelete={handleDelete}/>
        </div>
    )
}
