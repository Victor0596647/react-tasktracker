import { FormEvent } from "react";
import { TaskObj } from './taskReducer';
import hexGen from './hexGen';

export function AddTask({handleAdd, visible}:{handleAdd:(task:TaskObj) => void, visible:boolean}) {
    return (
        <div className="addTask" style={{display:(visible ? 'block' : 'none'), opacity:0}}>
            <form method='post' onSubmit={e => {e.preventDefault(); onSubmit(e, handleAdd)}} autoComplete="off">
                <input name="taskName" type='text' required placeholder="Name" />
                <input name="taskDesc" type='text' required placeholder="Description" />
                <input name="taskDate" type='datetime-local' required />
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
