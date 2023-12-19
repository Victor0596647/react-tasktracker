import React, { FormEvent } from "react";

export function AddTask({handleAdd}:{handleAdd:(title:string, desc:string, date:Date) => void}):React.ReactElement {
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

function onSubmit(e:FormEvent<HTMLFormElement>, handleAdd:(title:string, desc:string, date:Date) => void) {
    const form = new FormData(e.currentTarget);
    const {title, desc, date} = {title:form.get("taskName")!.toString(), desc:form.get("taskDesc")!.toString(), date: new Date(form.get("taskDate") as unknown as Date)};
    handleAdd(title, desc, date);
}