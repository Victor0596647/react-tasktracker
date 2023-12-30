export type TaskObj = {
    id: string,
    title: string,
    desc: string,
    date: Date
}

export const taskReducer = (state:TaskObj[], action: {type:"ADD" | "REMOVE", value: TaskObj}):TaskObj[] => {
    switch(action.type){
        case "ADD":
            return [action.value, ...state];
        case "REMOVE":
            return state.filter(i => {return i !== action.value });
        default:
            return state;
    }
}

type formStateProps = { visible: boolean, finished: boolean, anim_type?: 'open' | 'close' }
type formActionProps = { type:"OPEN"|"CLOSE"|"NONE" } | { type:"VISIBILITY", value:boolean }

export const formTaskReducer = (state: formStateProps, action: formActionProps): formStateProps => {
    switch(action.type){
        case "OPEN":
            return {
                ...state,
                finished:false,
                anim_type:'open'
            }
        case "CLOSE":
            return {
                ...state,
                finished:false,
                anim_type:'close'
            }
        case "VISIBILITY":
            return {
                ...state,
                visible: action.value
            }
        case "NONE":
            return {...state, finished: true, anim_type:undefined}
    }
}
