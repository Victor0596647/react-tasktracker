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
