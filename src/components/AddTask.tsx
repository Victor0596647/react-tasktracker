import React, { FormEvent } from "react";
import { TaskObj } from './taskReducer';
import hexGen from './hexGen';

export function AddTask({handleAdd}:{handleAdd:(task:TaskObj) => void}):React.ReactElement {
    return (
        <div className="addTask">
            <form method='post' onSubmit={e => {e.preventDefault(); onSubmit(e, handleAdd)}}>
                <input name="taskName" type='text' required placeholder="Name"/>
                <input name="taskDesc" type='text' required placeholder="Description" />
                <input name="taskDate" type='datetime-local' required title="Task Date"/>
                <input type='submit'/>
            </form>
        </div>
    )
}

function onSubmit(e:FormEvent<HTMLFormElement>, handleAdd:(task: TaskObj) => void) {
    const form = new FormData(e.currentTarget);
    const task: TaskObj = {id: hexGen(8), title:form.get("taskName")!.toString(), desc:form.get("taskDesc")!.toString(), date: new Date(form.get("taskDate") as unknown as Date)};
    handleAdd(task);
}
