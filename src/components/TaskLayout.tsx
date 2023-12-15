import React, { useRef } from "react";
import {BsPlus} from 'react-icons/bs'
import { handleActive } from "./taskFunc";

import '../styles/task.css';

export function TaskLayout():React.ReactElement {
    const plusRef = useRef<HTMLSpanElement>(null);
    return (
        <div className="taskLayout">
            <div className="header">
                <h1>Tasks</h1>
                <span className="plus" ref={plusRef}><BsPlus onClick={() => {handleActive(plusRef)}}/></span>
            </div>
        </div>
    )
}