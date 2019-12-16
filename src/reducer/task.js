import * as actionTypes from "../actions/task.types"


const INITIAL_STATE={
    taskList:[]
}
export default function task (state = INITIAL_STATE, action) {
    switch (action.type) {
        case actionTypes.API_GET_TASK_INITIATED:
            return state;
        case actionTypes.API_GET_TASK_SUCCESS:
            return {...state,taskList:action.task};
        case actionTypes.API_GET_TASK_FAILED:
            return state;
            case actionTypes.API_POST_TASK_INITIATED:
                return state;
            case actionTypes.API_POST_TASK_SUCCESS:
                return {...state,taskList:action.task};
            case actionTypes.API_POST_TASK_FAILED:
                return state;
        default: return state;
    }
}